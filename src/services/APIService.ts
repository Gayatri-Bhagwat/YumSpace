import type { Credentials } from "../Enums/Auth";
import type { MyFormValues } from "../Enums/FormFields";

const base_url = import.meta.env.BASE_URL;

const getCookie = (name: string): string => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? "";
  return "";
};

export const getHeaders = () => ({
  "Content-Type": "application/x-www-form-urlencoded",
  Authorization: `Token ${localStorage.getItem("token")}`,
  "X-CSRFToken": getCookie("csrftoken"),
});
export const getHeadersForMultipart = () => ({
  "Content-Type": "application/json",
  Authorization: `Token ${localStorage.getItem("token")}`,
});

export const API = {
  get: (path: string) => fetch(`${base_url}${path}`, { headers: getHeaders() }),
  postToken: (path: string, body: Credentials) =>
    fetch(`${base_url}${path}`, {
      headers: getHeaders(),
      method: "POST",
      body: new URLSearchParams(body),
    }),
  getWithParams: (path: string, params: Record<string, string>) =>
    fetch(`${base_url}${path}?${new URLSearchParams(params)}`, {
      headers: getHeaders(),
      method: "GET",
    }),
  refreshToken:(path: string, body: {refresh_token: string}) =>
    fetch(`${base_url}${path}`, {
      headers: getHeaders(),
      method: "POST",
      body: new URLSearchParams(body)
    }),
};

// ─── Token Helpers ─────────────────────────────────────────
function isAccessTokenExpired(): boolean {
    const expiry = localStorage.getItem("access_token_expiry");
    console.log(!expiry || Date.now() > Number(expiry), "Expired or not");
    return !expiry || Date.now() > Number(expiry);
}

export const refreshApiToken = async (data: string) => {
    try {
        // Intentionally no Authorization header — the expired access token
        // would cause some backends to reject the refresh request.
        const response = await fetch(`${base_url}api/user/refresh/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: new URLSearchParams({ refresh_token: data }),
        });

        if (!response.ok) {
            console.log("Fetch refresh token failed.");
            const errorData = await response.json();
            return { success: false, errorDetails: errorData, status: response.status };
        }

        const validData = await response.json();
        console.log(validData.access_token, "Access token (newly)");

        localStorage.setItem("token", validData.access_token);
        localStorage.setItem("refresh_token", validData.refresh_token);
        localStorage.setItem("access_token_expiry", (Date.now() + 30 * 60 * 1000).toString());

        return { success: true, data: validData, status: response.status };
    } catch (networkError: unknown) {
        console.log("Fetch refresh token failed.");
        return { success: false, errorDetails: { detail: networkError }, status: 0 };
    }
};
const handleExpiredToken = async (): Promise<boolean> => {
    console.log("Expired token");
    
    const refreshToken = localStorage.getItem("refresh_token");
    console.log("Refresh token from storage:", refreshToken); // ✅ check if null

    if (!refreshToken) {
        console.log("No refresh token found — clearing storage");
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token_expiry");
        return false;
    }

    const result = await refreshApiToken(refreshToken);
    console.log("Refresh result:", result);

    if (!result.success) {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token_expiry");
        return false;
    }

    return true;
};

const ensureValidToken = async (): Promise<boolean> => {
    if (isAccessTokenExpired()) {
        return await handleExpiredToken();
    }
    return true;
};

// ─── API Methods ───────────────────────────────────────────
export const getApiToken = async (data: Credentials) => {
    try {
        const response = await fetch(`${base_url}api/user/token/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, errorDetails: errorData, status: response.status };
        }

        const validData = await response.json();

        // ✅ Save both tokens on login
        localStorage.setItem("token", validData.access_token);
        localStorage.setItem("refresh_token", validData.refresh_token);
        localStorage.setItem("access_token_expiry", (Date.now() + 30 * 60 * 1000).toString());

        return { success: true, data: validData, status: response.status };
    } catch (networkError: unknown) {
        return { success: false, errorDetails: { detail: networkError }, status: 0 };
    }
};

export const getAllRecipes = async (search: Record<string, string>, getAllData: boolean) => {
    try {
        if (!await ensureValidToken()) {
            return { success: false, errorDetails: { detail: "Session expired." }, status: 401 };
        }

        const response = getAllData
            ? await API.get("api/recipe/recipes/")
            : await API.getWithParams("api/recipe/recipes/", search);
        console.log(base_url,"base url")
        console.log(localStorage.getItem("token"))

        console.log(response);
        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, errorDetails: errorData, status: response.status };
        }

        const validData = await response.json();
        console.log(validData);
        return { success: true, data: validData, status: response.status };
    } catch (networkError: unknown) {
        return { success: false, errorDetails: { detail: networkError }, status: 0 };
    }
};

export const editExistingRecipe = async (data: MyFormValues, id: number) => {
    try {
        if (!await ensureValidToken()) {
            return { success: false, errorDetails: { detail: "Session expired." }, status: 401 };
        }

        const { image, ...recipeData } = data;
        const response = await fetch(`${base_url}api/recipe/recipes/${id}/`, {
            method: "PATCH",
            headers: getHeadersForMultipart(),
            body: JSON.stringify(recipeData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, errorDetails: errorData, status: response.status };
        }

        const validData = await response.json();
        return { success: true, data: validData, status: response.status };
    } catch (networkError: unknown) {
        return { success: false, errorDetails: { detail: networkError }, status: 0 };
    }
};

export const deleteExistingRecipe = async (id: number) => {
    try {
        if (!await ensureValidToken()) {
            return { success: false, errorDetails: { detail: "Session expired." }, status: 401 };
        }

        const response = await fetch(`${base_url}api/recipe/recipes/${id}/`, {
            method: "DELETE",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                Authorization: `Token ${localStorage.getItem("token")}`,
            },
        });

        console.log("Response delete", response);
        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, errorDetails: errorData, status: response.status };
        }

        return await response;
    } catch (networkError: unknown) {
        return { success: false, errorDetails: { detail: networkError }, status: 0 };
    }
};

export const addNewRecipe = async (data: MyFormValues) => {
    try {
        if (!await ensureValidToken()) {
            return { success: false, errorDetails: { detail: "Session expired." }, status: 401 };
        }

        const { image, ...recipeData } = data;

        // Step 1 — create recipe as JSON (no image)
        const response = await fetch(`${base_url}api/recipe/recipes/`, {
            method: "POST",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(recipeData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, errorDetails: errorData, status: response.status };
        }

        const createdRecipe = await response.json();

        // Step 2 — upload image
        const formData = new FormData();
        if (data.image instanceof FileList && data.image.length > 0) {
            formData.append("image", data.image[0]);
        } else if (data.image instanceof File) {
            formData.append("image", data.image);
        } else if (typeof data.image === "string") {
            formData.append("image", data.image);
        }

        const imgResponse = await fetch(
            `${base_url}api/recipe/recipes/${createdRecipe.id}/upload-image/`,
            {
                method: "POST",
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
                body: formData,
            }
        );

        if (!imgResponse.ok) {
            const errorData = await imgResponse.json();
            return { success: false, errorDetails: errorData, status: imgResponse.status };
        }

        return { success: true, data: createdRecipe, status: response.status };
    } catch (networkError: unknown) {
        return { success: false, errorDetails: { detail: networkError }, status: 0 };
    }
};

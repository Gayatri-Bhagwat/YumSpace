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
  getWithParams: (path: string, params: Record<string, string | boolean>) =>
    fetch(`${base_url}${path}?${new URLSearchParams(
      Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))
    )}`, {
      headers: getHeaders(),
      method: "GET",
    }),
};

// ─── Token Helpers ─────────────────────────────────────────

function isAccessTokenExpired(): boolean {
    const expiry = localStorage.getItem("access_token_expiry");
    return !expiry || Date.now() > Number(expiry);
}

function clearAuthStorage() {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token_expiry");
}

export const refreshApiToken = async (data: string) => {
    try {
        // No Authorization header — an expired access token causes some
        // backends to reject the refresh request outright.
        const response = await fetch(`${base_url}api/user/refresh/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify({ refresh_token: data }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, errorDetails: errorData, status: response.status };
        }

        const validData = await response.json();

        localStorage.setItem("token", validData.access_token);
        localStorage.setItem("refresh_token", validData.refresh_token);
        localStorage.setItem("access_token_expiry", (Date.now() + 30 * 60 * 1000).toString());

        return { success: true, data: validData, status: response.status };
    } catch (networkError: unknown) {
        return { success: false, errorDetails: { detail: networkError }, status: 0 };
    }
};

// Shared in-flight refresh promise — if multiple requests fire while the
// token is expired, they all wait on the same refresh instead of each
// sending their own, which would burn the refresh token.
let refreshPromise: Promise<boolean> | null = null;

const handleExpiredToken = async (): Promise<boolean> => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
        clearAuthStorage();
        return false;
    }
    const result = await refreshApiToken(refreshToken);
    if (!result.success) {
        clearAuthStorage();
        return false;
    }
    return true;
};

const ensureValidToken = async (): Promise<boolean> => {
    if (!isAccessTokenExpired()) return true;

    if (!refreshPromise) {
        refreshPromise = handleExpiredToken().finally(() => {
            refreshPromise = null;
        });
    }
    return await refreshPromise;
};

// Runs an authenticated fetch; on a 401 (token expired but client didn't
// know — e.g. clock skew) it refreshes once and retries automatically.
const fetchWithAuth = async (fn: () => Promise<Response>): Promise<Response> => {
    const response = await fn();
    if (response.status !== 401) return response;

    if (!refreshPromise) {
        refreshPromise = handleExpiredToken().finally(() => {
            refreshPromise = null;
        });
    }
    const refreshed = await refreshPromise;
    if (!refreshed) return response;

    return await fn();
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

export const getAllRecipes = async (search: Record<string, string | boolean>, getAllData: boolean) => {
    try {
        if (!await ensureValidToken()) {
            return { success: false, errorDetails: { detail: "Session expired." }, status: 401 };
        }

        const response = await fetchWithAuth(() =>
            getAllData
                ? API.get("api/recipe/recipes/")
                : API.getWithParams("api/recipe/recipes/", search)
        );

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

export const editExistingRecipe = async (data: MyFormValues, id: number) => {
    try {
        if (!await ensureValidToken()) {
            return { success: false, errorDetails: { detail: "Session expired." }, status: 401 };
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { image, ...recipeData } = data;
        const response = await fetchWithAuth(() =>
            fetch(`${base_url}api/recipe/recipes/${id}/`, {
                method: "PATCH",
                headers: getHeadersForMultipart(),
                body: JSON.stringify(recipeData),
            })
        );

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

        const response = await fetchWithAuth(() =>
            fetch(`${base_url}api/recipe/recipes/${id}/`, {
                method: "DELETE",
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            })
        );

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, errorDetails: errorData, status: response.status };
        }

        return response;
    } catch (networkError: unknown) {
        return { success: false, errorDetails: { detail: networkError }, status: 0 };
    }
};

export const addNewRecipe = async (data: MyFormValues) => {
    try {
        if (!await ensureValidToken()) {
            return { success: false, errorDetails: { detail: "Session expired." }, status: 401 };
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { image, ...recipeData } = data;

        // Step 1 — create recipe as JSON (no image)
        const response = await fetchWithAuth(() =>
            fetch(`${base_url}api/recipe/recipes/`, {
                method: "POST",
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(recipeData),
            })
        );

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

        const imgResponse = await fetchWithAuth(() =>
            fetch(`${base_url}api/recipe/recipes/${createdRecipe.id}/upload-image/`, {
                method: "POST",
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
                body: formData,
            })
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

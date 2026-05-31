import type { Credentials } from "../Enums/Auth";
import type { MyFormValues } from "../Enums/FormFields";

const base_url = "";
export const getHeaders = () => ({
  "Content-Type": "application/x-www-form-urlencoded",
  Authorization: `Token ${localStorage.getItem("token")}`,
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
};

export const getApiToken = async (data: Credentials) => {
  try {
    const response = await API.postToken("api/user/token/", data);

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        errorDetails: errorData,
        status: response.status,
      };
    }

    const validData = await response.json();
    return { success: true, data: validData, status: response.status };
  } catch (networkError: unknown) {
    return {
      success: false,
      errorDetails: { detail: networkError },
      status: 0,
    };
  }
};

export const getAllRecipes = async () => {
  try {
    const response = await API.get("api/recipe/recipes/");
    console.log(localStorage.getItem("token"));
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        errorDetails: errorData,
        status: response.status,
      };
    }
    const validData = await response.json();
    console.log(validData);
    return { success: true, data: validData, status: response.status };
  } catch (networkError: unknown) {
    return {
      success: false,
      errorDetails: { detail: networkError },
      status: 0,
    };
  }
};

export const editExistingRecipe = async (data: MyFormValues, id: number) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {image, ...recipeData} = data
    const response = await fetch(`${base_url}/api/recipe/recipes/${id}/`, {
      method: "PATCH",
      headers: getHeadersForMultipart(),
      body: JSON.stringify(recipeData)
    });
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        errorDetails: errorData,
        status: response.status,
      };
    }

    const validData = await response.json();
    return { success: true, data: validData, status: response.status };
  } catch (networkError: unknown) {
    return {
      success: false,
      errorDetails: { detail: networkError },
      status: 0,
    };
  }
};

export const deleteExistingRecipe = async (id: number) => {
  try {
    const response = await fetch(`${base_url}/api/recipe/recipes/${id}/`, {
      method:"DELETE",
      headers:{
        Authorization: `Token ${localStorage.getItem('token')}`
      },
    })
    console.log("Response delete", response)
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        errorDetails: errorData,
        status: response.status,
      };
    }

   return await response
  } catch (networkError: unknown) {
    return {
      success: false,
      errorDetails: { detail: networkError },
      status: 0,
    };
  }
}

export const addNewRecipe = async (data: MyFormValues) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { image, ...recipeData } = data;

    // Step 1 — create recipe as JSON (no image)
    const response = await fetch(`${base_url}/api/recipe/recipes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`,
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
    } else if (typeof data.image === 'string') {
      formData.append("image", data.image);
    }

    const imgResponse = await fetch(
      `${base_url}/api/recipe/recipes/${createdRecipe.id}/upload-image/`,
      {
        method: "POST",
        headers: {
          "Authorization": `Token ${localStorage.getItem("token")}`,
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


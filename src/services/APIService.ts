import type { Credentials } from "../Enums/Auth";

const base_url = "";
export const getHeaders = () => ({
  "Content-Type": "application/x-www-form-urlencoded",
  Authorization: `Token ${localStorage.getItem("token")}`,
});

export const API = {
  get: (path: string) => fetch(`${base_url}${path}`, { headers: getHeaders(), }),
  post: (path: string, body: Credentials) =>
    fetch(`${base_url}${path}`, {
      headers: getHeaders(),
      method: "POST",
      body: new URLSearchParams(body),
    }),
};

export const getApiToken = async (data: Credentials) => {
  try {
    const response = await API.post("api/user/token/", data);

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
    console.log(localStorage.getItem("token"))
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        errorDetails: errorData,
        status: response.status,
      };
    }
    const validData = await response.json();
    console.log(validData)
    return { success: true, data: validData, status: response.status };
  } catch (networkError: unknown) {
    return {
      success: false,
      errorDetails: { detail: networkError },
      status: 0,
    };
  }
};

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { RecipeCardData } from "../../TestData/TestData";
import type { MyFormValues } from "../../Enums/FormFields";

interface RecipeState {
  recipe: MyFormValues[];
  userRecipe: MyFormValues[];
  filteredRecipeData: MyFormValues[];
  filteredUserRecipeData: MyFormValues[];
  isSearchActive: boolean;
  isUserSearchActive: boolean;
}

const initialState: RecipeState = {
  recipe: RecipeCardData,
  userRecipe: [],
  filteredRecipeData: [],
  filteredUserRecipeData: [],
  isSearchActive: false,
  isUserSearchActive: false,
};

export const RecipeSlice = createSlice({
  name: "addRecipeSlice",
  initialState,
  reducers: {
    setRecipe: (state, action: PayloadAction<MyFormValues[]>) => {
      state.recipe = action.payload;
    },
    setUserRecipe: (state, action: PayloadAction<MyFormValues[]>) => {
      state.userRecipe = action.payload;
    },
    addRecipe: (state, action: PayloadAction<MyFormValues>) => {
      state.recipe.push(action.payload);
      state.userRecipe.push(action.payload);
    },
    editRecipe: (state, action: PayloadAction<MyFormValues>) => {
      const update = (list: MyFormValues[]) => {
        const i = list.findIndex((r) => r.id === action.payload.id);
        if (i !== -1) list[i] = action.payload;
      };
      update(state.recipe);
      update(state.userRecipe);
      update(state.filteredRecipeData);
      update(state.filteredUserRecipeData);
    },
    deleteRecipe: (state, action: PayloadAction<string>) => {
      const remove = (list: MyFormValues[]) => {
        const i = list.findIndex((r) => r.title === action.payload);
        if (i !== -1) list.splice(i, 1);
      };
      remove(state.recipe);
      remove(state.userRecipe);
      remove(state.filteredRecipeData);
      remove(state.filteredUserRecipeData);
    },
    searchRecipe: (state, action: PayloadAction<MyFormValues[]>) => {
      state.filteredRecipeData = action.payload;
      state.isSearchActive = true;
      // clear the other scope so the IIFE never returns stale Mine results
      state.isUserSearchActive = false;
      state.filteredUserRecipeData = [];
    },
    searchUserRecipe: (state, action: PayloadAction<MyFormValues[]>) => {
      state.filteredUserRecipeData = action.payload;
      state.isUserSearchActive = true;
      // clear the other scope so the IIFE never returns stale Everyone results
      state.isSearchActive = false;
      state.filteredRecipeData = [];
    },
    clearSearch: (state) => {
      state.filteredRecipeData = [];
      state.filteredUserRecipeData = [];
      state.isSearchActive = false;
      state.isUserSearchActive = false;
    },
  },
});

export const {
  setRecipe, setUserRecipe,
  addRecipe, editRecipe, deleteRecipe,
  searchRecipe, searchUserRecipe, clearSearch,
} = RecipeSlice.actions;
export default RecipeSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { RecipeCardData } from "../../TestData/TestData";
import type { MyFormValues } from "../../Enums/FormFields";

interface RecipeState {
  recipe: MyFormValues[];
  filteredRecipeData: MyFormValues[]
}

const initialState: RecipeState = {
  recipe: RecipeCardData,
  filteredRecipeData: []
};

export const RecipeSlice = createSlice({
  name: "addRecipeSlice",
  initialState,
  reducers: {
    setRecipe: (state, action: PayloadAction<MyFormValues[]>) => {
      if (state.filteredRecipeData.length !== 0)
      {
        state.recipe = state.filteredRecipeData
      }
      else{
        state.recipe = action.payload
      }
    },
    addRecipe: (state, action: PayloadAction<MyFormValues>) => {
      state.recipe.push(action.payload);
    },
    editRecipe: (state, action: PayloadAction<MyFormValues>) => {
      const recipeIndex = state.recipe.findIndex(
        (r) => r.id === action.payload.id,
      );
      state.recipe[recipeIndex] = action.payload;
    },
    deleteRecipe: (state, action: PayloadAction<string>) => {
      const recipeIndex = state.recipe.findIndex(
        (r) => r.title === action.payload,
      );
      state.recipe.splice(recipeIndex, 1);
    },
    searchRecipe: (state, action:PayloadAction<MyFormValues[]>) => {
      state.filteredRecipeData = action.payload
    }
  },
});

export const { setRecipe, addRecipe, editRecipe, deleteRecipe, searchRecipe } =
  RecipeSlice.actions;
export default RecipeSlice.reducer;

import { configureStore } from "@reduxjs/toolkit"
import RecipeReducer from "../features/addRecipe/addRecipeSlice"
import showRecipeAddFormReducer from "../features/showRecipeForm/showRecipeSlice"

export const store = configureStore({
    reducer:{
        addRecipe: RecipeReducer,
        showRecipe: showRecipeAddFormReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;


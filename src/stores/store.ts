import { configureStore } from "@reduxjs/toolkit"
import RecipeReducer from "../features/addRecipe/addRecipeSlice"

export const store = configureStore({
    reducer:{
        addRecipe: RecipeReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;


import { configureStore } from "@reduxjs/toolkit"
import RecipeReducer from "../features/addRecipe/addRecipeSlice"
import showRecipeAddFormReducer from "../features/showRecipeForm/showRecipeSlice"
import dialogSliceReducer from "../features/showDialogBox/showDialogSlice"

export const store = configureStore({
    reducer:{
        addRecipe: RecipeReducer,
        showRecipe: showRecipeAddFormReducer,
        showDialog:dialogSliceReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;


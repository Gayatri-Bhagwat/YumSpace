import { configureStore } from "@reduxjs/toolkit"
import RecipeReducer from "../features/addRecipe/addRecipeSlice"
import showRecipeAddFormReducer from "../features/showRecipeForm/showRecipeSlice"
import dialogSliceReducer from "../features/showDialogBox/showDialogSlice"
import showGenerateIngredientSliceReducer from "../features/showGenerateIngredients/showGenerateIngredientSlice"
import createIngredientListReducer from "../features/addIngredientsToList/addIngredientsToList"

export const store = configureStore({
    reducer:{
        addRecipe: RecipeReducer,
        showRecipe: showRecipeAddFormReducer,
        showDialog:dialogSliceReducer,
        showGenerateIngredient: showGenerateIngredientSliceReducer,
        addIngredients: createIngredientListReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;


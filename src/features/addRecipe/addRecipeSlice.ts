import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { RecipeCardData } from "../../TestData/TestData";
import type { MyFormValues } from "../../Enums/FormFields";

interface RecipeState {
    recipe: MyFormValues[];
}

const initialState : RecipeState = {
    recipe: RecipeCardData
}

export const RecipeSlice = createSlice({
    name:"addRecipeSlice",
    initialState,
    reducers:{
        addRecipe:(state, action:PayloadAction<MyFormValues>) => {
            state.recipe.push(action.payload)
        },
        editRecipe:(state, action:PayloadAction<MyFormValues>) => {
            const recipeIndex = state.recipe.findIndex((r)=>r.title === action.payload.title)
            console.log(recipeIndex)
            state.recipe[recipeIndex] = action.payload;
        }
    }
})

export const {addRecipe, editRecipe} = RecipeSlice.actions
export default RecipeSlice.reducer
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
            const recipeIndex = state.recipe.findIndex((r)=>r.id === action.payload.id)
            console.log(recipeIndex)
            state.recipe[recipeIndex] = action.payload;
        },
        deleteRecipe:(state, action:PayloadAction<string>) => {
            const recipeIndex = state.recipe.findIndex((r)=>r.title === action.payload)
            console.log(recipeIndex)
            state.recipe.splice(recipeIndex, 1)
        }
    }
})

export const {addRecipe, editRecipe, deleteRecipe} = RecipeSlice.actions
export default RecipeSlice.reducer
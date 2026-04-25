import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";
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
            console.log(current(state), "Adding data")
        }
    }
})

export const {addRecipe} = RecipeSlice.actions
export default RecipeSlice.reducer
import { createSlice } from "@reduxjs/toolkit"
import type { MyFormValues } from "../../Enums/FormFields";

interface showForm {
    visible: boolean,
    selectedRecipe: MyFormValues | null,
    mode:"edit" | "add"
}

const initialState: showForm = {
    visible: false,
    selectedRecipe: null,
    mode:"add"
}

export const showRecipeSlice = createSlice({
    name:"showRecipeAddForm",
    initialState,
    reducers:{
        showRecipeForm:(state, action)=>{
            state.visible = true
            state.selectedRecipe = action.payload.selectedRecipe;
            state.mode = action.payload.mode
        },
        hideRecipeForm:(state)=>{
            state.visible = false;
            state.selectedRecipe = null;
        }
    }
})

export const {showRecipeForm, hideRecipeForm} = showRecipeSlice.actions
export default showRecipeSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

interface showGenerateIngredientProps {
    ingredientVisible : boolean
}

const initialState:showGenerateIngredientProps={
    ingredientVisible:false
}
export const showGenerateIngredientSlice = createSlice({
    name:"showGenerateIngredientSlice",
    initialState,
    reducers:{
        showIngredientDialog:(state)=>{
            state.ingredientVisible = true
        },
        hideIngredientDialog:(state)=>{
            state.ingredientVisible = false
        }
    }

})

export const {showIngredientDialog, hideIngredientDialog} = showGenerateIngredientSlice.actions;
export default showGenerateIngredientSlice.reducer; 
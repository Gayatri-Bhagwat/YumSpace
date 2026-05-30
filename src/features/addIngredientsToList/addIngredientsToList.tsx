import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialShoppingData } from "../../TestData/TestData";
import type { SelectedGroceryListEnum } from "../../Enums/FormFields";
import type { Category } from "../../components/Grocery/Grocery";

interface initialGroceryData {
    groceryData : SelectedGroceryListEnum
}

const initialState :initialGroceryData = {
    groceryData : initialShoppingData
}

type AddIngredientPayload = {
    category: Category;
    ingredient: string;
}

export const createIngredientListSlice = createSlice({
    name:"createIngredientList",
    initialState:initialState,
    reducers:{
        addIngredient: (state, action:PayloadAction<AddIngredientPayload>) => {
           const {category, ingredient}= action.payload;
           state.groceryData[category].push(ingredient);
        }
    }
})

export const {addIngredient} = createIngredientListSlice.actions;
export default createIngredientListSlice.reducer;
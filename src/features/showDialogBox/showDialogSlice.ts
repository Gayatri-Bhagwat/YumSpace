import { createSlice } from "@reduxjs/toolkit";

interface dialogProps {
    visible : boolean
}

const initialState:dialogProps={
    visible:false
}
export const showDialogSlice = createSlice({
    name:"dialogSlice",
    initialState,
    reducers:{
        showDialog:(state)=>{
            state.visible = true
        },
        hideDialog:(state)=>{
            state.visible = false
        }
    }

})

export const {showDialog, hideDialog} = showDialogSlice.actions;
export default showDialogSlice.reducer; 
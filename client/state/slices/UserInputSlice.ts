import { createSlice } from "@reduxjs/toolkit";

export interface UserInput {
    Selected : 'heal' | 'undersantd' | 'signals' | false
    ExplainingSelected : string | false;

}

const initialState: UserInput = {
    Selected : false,
    ExplainingSelected : false,
};

const UserInputSlice = createSlice({
     name: "User Inputs",
     initialState,
     reducers : {
        SetSelected : ( state , action) => {
            if(!state.Selected){
             state.Selected = action.payload;   
            }
            if( action.payload == false){
            state.Selected  = false;
            } 
        },
        SetExplained : ( state , action) => {
            if(!state.ExplainingSelected){
             state.ExplainingSelected = action.payload;   
            }
            if( action.payload == false){
            state.ExplainingSelected  = false;
            } 
        },
        }
        })

        export const { SetSelected, SetExplained } = UserInputSlice.actions;
        export default UserInputSlice.reducer;
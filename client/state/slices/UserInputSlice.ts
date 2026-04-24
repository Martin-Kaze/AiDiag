import { createSlice } from "@reduxjs/toolkit";

export interface UserInput {
    Selected : 'heal' | 'undersantd' | 'signals' | false
    ExplainingSelected : string | false;
    Gender : 'male' | 'female' | 'undiclosed' | false;
    Age : number | false;

}

const initialState: UserInput = {
    Selected : false,
    ExplainingSelected : false,
    Gender : false,
    Age : false,
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
        SetGender : ( state , action) => {
            if(!state.Gender){
             state.Gender = action.payload;   
            }
            if( action.payload == false){
            state.Gender  = false;
            } 
        },
        SetAge : ( state , action) => {
            if(!state.Age){
             state.Age = action.payload;   
            }
            if( action.payload == false){
            state.Age  = false;
            } 
        }
        }
        })

        export const { SetSelected, SetExplained, SetGender, SetAge} = UserInputSlice.actions;
        export default UserInputSlice.reducer;
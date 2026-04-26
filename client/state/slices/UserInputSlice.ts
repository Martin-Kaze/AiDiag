import { createSlice } from "@reduxjs/toolkit";

export interface UserInput {
    Selected : 'heal' | 'undersantd' | 'signals' | false
    ExplainingSelected : string | false;
    Gender : 'slim' | 'fat' | 'obese' | false;
    Age : number | false;
    Info2 : string | false;
    Posture : {};

}

const initialState: UserInput = {
    Selected : false,
    ExplainingSelected : false,
    Gender : false,
    Age : false,
    Info2 : false,
    Posture : {}
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
        },
        SetInfo2 : ( state , action ) => {
            if(!state.Info2){
             state.Info2 = action.payload;  
           
            }
            if( action.payload == false){
            state.Info2  = false;
            } 
        },
         SetPosure : ( state , action ) => {
            if(!state.Posture){
             state.Posture = action.payload;  
            }
            if( action.payload == false){
            state.Posture  = false;
            } 
        },
        }
        })

        export const { SetSelected, SetExplained, SetGender, SetAge ,SetInfo2, SetPosure} = UserInputSlice.actions;
        export default UserInputSlice.reducer;
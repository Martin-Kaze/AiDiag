import { createSlice } from "@reduxjs/toolkit";

interface MyState {
    selected: string[]; 
}

const initialState: MyState = {
    selected: [] 
};

const dataSlice = createSlice({
    name: "some data",
    initialState,
    reducers : {
        add : (state , action) => {
        if( state.selected.includes(action.payload)){
            console.log('already')
        }
        else{
        state.selected = [... state.selected, action.payload ]
        }
         
        },
        remove : (state, action) => {
            state.selected = state.selected.filter( symptom => symptom !== action.payload)
        },
    }
})

export const { add, remove} = dataSlice.actions;
export default dataSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export interface MyState {
    show: boolean;
}

const initialState: MyState = {
    show : false
};

const DispalySlice = createSlice({
    name: "Show the popup or not? state",
    initialState,
    reducers : {
        on : (state ) => {
        state.show = true;
        },
        off : (state) => {
        state.show = false;    
        },
    }
})

export const { on, off } = DispalySlice.actions;
export default DispalySlice.reducer;
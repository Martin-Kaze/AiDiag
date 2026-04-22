import { createSlice } from "@reduxjs/toolkit";

export interface MyState {
    progress: number;
}

const initialState: MyState = {
    progress : 10
};

const ProgresSlice = createSlice({
    name: "Show the popup or not? state",
    initialState,
    reducers : {
        increase : (state, action ) => {
        state.progress += action.payload;
        },
        reduce : (state, action) => {
        state.progress -=  action.payload
        },
    }
})

export const { increase , reduce } = ProgresSlice.actions;
export default ProgresSlice.reducer;
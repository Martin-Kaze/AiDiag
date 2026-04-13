import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : 0,
    size : 0
};

const dataSlice = createSlice({
    name: "some data",
    initialState,
    reducers : {
        incrament : (state) => {
            state.value += 1;
        },
        decrament : (state) => {
            state.size += 1;
        },
        decramentbyammount : (state, action) => {
            state.value -= action.payload
        },
    }
})

export const { incrament, decrament, decramentbyammount} = dataSlice.actions;
export default dataSlice.reducer;
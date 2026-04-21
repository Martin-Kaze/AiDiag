import { createSlice } from "@reduxjs/toolkit";

export interface ShowTextState {
    show: boolean;
    topic : string;
}

const initialState: ShowTextState = {
    show : false,
    topic : "not selected"
};

const ShowTextSlice = createSlice({
     name: "some data",
     initialState,
     reducers : {
        TurnOn : ( state) => {
            state.show = true;
        },
        TurnOff : ( state) => {
            state.show = false;
        },
        SetTopic : (state, action) => {
    // Check the payload type, not the action type
    if (typeof action.payload === 'string') {
        state.topic = action.payload;
    }
}
     }
})

export const { TurnOn , TurnOff , SetTopic} = ShowTextSlice.actions;
export default ShowTextSlice.reducer;
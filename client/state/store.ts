import { configureStore } from "@reduxjs/toolkit";

import UserInputReducer from "./slices/UserInputSlice"

// 1. Wrap the store in a function
export const makeStore = () => {
  return configureStore({
    reducer: {
        UserInputReducer : UserInputReducer,
       
    }
  });
};

// 2. Derive types from the 'makeStore' function itself
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
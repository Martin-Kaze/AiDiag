import { configureStore } from "@reduxjs/toolkit";

import PopupReduce from './slices/PopUpSlice';
import ShowTextReducer from "./slices/ShowTextSlice"
import ProgressReducer from "./slices/ProgressSlice"
// 1. Wrap the store in a function
export const makeStore = () => {
  return configureStore({
    reducer: {
        ProgressReducer : ProgressReducer,
        DispalyRecude : PopupReduce,
        ShowTextRedue : ShowTextReducer,
    }
  });
};

// 2. Derive types from the 'makeStore' function itself
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
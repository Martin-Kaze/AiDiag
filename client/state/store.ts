import { configureStore } from "@reduxjs/toolkit";
import SymptomsDeducer from './slices/slice';
import PopupReduce from './slices/PopUpSlice';
import ShowTextReducer from "./slices/ShowTextSlice"

// 1. Wrap the store in a function
export const makeStore = () => {
  return configureStore({
    reducer: {
        SymptomsReduce : SymptomsDeducer,
        DispalyRecude : PopupReduce,
        ShowTextRedue : ShowTextReducer,
    }
  });
};

// 2. Derive types from the 'makeStore' function itself
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
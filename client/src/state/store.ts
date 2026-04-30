import { configureStore } from "@reduxjs/toolkit";
import SymptomsDeducer from './slices/slice';
import PopupReduce from './slices/PopUpSlice';

export const store = configureStore({
    reducer: {
        SymptomsReduce : SymptomsDeducer,
        DispalyRecude : PopupReduce,
    }
})
// store.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
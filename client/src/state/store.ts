import { configureStore } from "@reduxjs/toolkit";
import SelecModelsReducer from './slices/slice';

export const store = configureStore({
    reducer: {
        SelectedModels : SelecModelsReducer
    }
})
// store.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
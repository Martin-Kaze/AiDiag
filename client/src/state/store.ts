import { configureStore } from "@reduxjs/toolkit";
import dataReducer from './slices/slice';

export const store = configureStore({
    reducer: {
        data : dataReducer
    }
})
// store.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
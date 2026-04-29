import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInput {
  selections: Record<string, any>;
}

const initialState: UserInput = {
  selections: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setField: (state, action: PayloadAction<{ key: string; value: any }>) => {
      const { key, value } = action.payload;
      state.selections[key] = value;
    },
  },
});

export const { setField } = userSlice.actions;
export default userSlice.reducer;
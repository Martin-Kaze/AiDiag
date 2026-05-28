import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

export interface UserInput {
  selections: Record<string, any>;
  list : any
}

const initialState: UserInput = {
  selections: {},
  list : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setField: (state, action: PayloadAction<{ key: string; value: any }>) => {
      const { key, value } = action.payload;
      state.selections[key] = value;
      console.log(current(state.selections))
    },
    setSubList: (state, action: PayloadAction<any>) => {
     
      state.list =  action.payload;
     
    },
  },
});

export const { setField, setSubList } = userSlice.actions;
export default userSlice.reducer;
import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

export interface UserInput {
  selections: Record<string, any>;
  list : any,
  QuickQuestion : string;
  YoutuberList : {},

}

const initialState: UserInput = {
  selections: {},
  list : null,
  QuickQuestion : "",
   YoutuberList : {},
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
    setQuestion : (state, action: PayloadAction<string>) =>{
      state.QuickQuestion = action.payload;
    },
    setYoutubeList : (state, action: PayloadAction<any>) =>{
      state.YoutuberList = action.payload;
    },
  },
  
});

export const { setField, setSubList, setQuestion, setYoutubeList } = userSlice.actions;
export default userSlice.reducer;
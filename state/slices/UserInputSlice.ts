import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type YoutuberItem = { name: string; channelId: string };

export interface UserInput {
  selections: Record<string, any>;
  list: any;
  QuickQuestion: string;
  YoutuberList: YoutuberItem[];
}

const initialState: UserInput = {
  selections: {},
  list: null,
  QuickQuestion: "",
  YoutuberList: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setField: (state, action: PayloadAction<{ key: string; value: any }>) => {
      const { key, value } = action.payload;
      state.selections[key] = value;
    },
    setQuestion: (state, action: PayloadAction<string>) => {
      state.QuickQuestion = action.payload;
    },
    setYoutubeList: (state, action: PayloadAction<YoutuberItem[]>) => {
      state.YoutuberList = action.payload;
    },
  },
});

export const { setField, setQuestion, setYoutubeList } = userSlice.actions;
export default userSlice.reducer;
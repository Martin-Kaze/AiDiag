import { createSlice, PayloadAction } from "@reduxjs/toolkit";




export interface UserInput {
  chartReload: boolean;
  
}

const initialState: UserInput = {
  chartReload: false,

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setChartReload: (state) => {
      state.chartReload = !state.chartReload;
    },
  },
});

export const { setChartReload} = userSlice.actions;
export default userSlice.reducer;
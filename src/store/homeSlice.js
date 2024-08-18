import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: {},
  genres: {},
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getUrlConfig: (state, action) => {
      state.url = action.payload;
    },
    getGenrsConfig: (state, action) => {
      state.genres = action.payload;
    },
  },
});
export const { getGenrsConfig, getUrlConfig } = homeSlice.actions;
export default homeSlice.reducer;

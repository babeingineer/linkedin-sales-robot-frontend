import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface LinkedinLoaderState {
  value: boolean;
}

const initialState: LinkedinLoaderState = {
  value: false,
};

export const linkedinLoaderSlice = createSlice({
  name: "linkedinLoader",
  initialState,
  reducers: {
    setLinkedinLoader: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setLinkedinLoader } = linkedinLoaderSlice.actions;

export const selectLinkedinLoader = (state: RootState) => {
  return state.linkedinLoader.value;
};

export default linkedinLoaderSlice.reducer;

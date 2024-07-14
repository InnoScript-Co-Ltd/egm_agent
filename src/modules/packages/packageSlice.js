import { createSlice } from "@reduxjs/toolkit";

const packageSlice = createSlice({
  name: "package",
  initialState: {
    packages: null,
    packageDetail: null
  },
  reducers: {
    index: (state, action) => {
      state.packages = action.payload
      return state;
    },
    show: (state, action) => {
      state.packageDetail = {...action.payload }
      return state;
    }
  },
});

export const {
  index,
  show
} = packageSlice.actions;
export default packageSlice.reducer;

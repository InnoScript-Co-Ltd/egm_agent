import { createSlice } from "@reduxjs/toolkit";

const transcationSlice = createSlice({
  name: "transcation",
  initialState: {
    transcations: [],
    transcation: null
  },
  reducers: {
    index: (state, action) => {
      state.transcations = action.payload
      return state;
    },
    
    show: (state, action) => {
      state.transcation = {...action.payload}
      return state;
    }
  },
});

export const {
  index,
  show
} = transcationSlice.actions;
export default transcationSlice.reducer;

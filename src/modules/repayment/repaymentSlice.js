import { createSlice } from "@reduxjs/toolkit";

const repaymentSlice = createSlice({
  name: "repayment",
  initialState: {
    repayments: [],
    repayment: null
  },
  reducers: {
    index: (state, action) => {
      state.repayments = action.payload;
      return state;
    },
    
    show: (state, action) => {
      state.repayment = {...action.payload }
      return state;
    }
  },
});

export const {
  index,
  show
} = repaymentSlice.actions;
export default repaymentSlice.reducer;

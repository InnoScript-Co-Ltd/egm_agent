import { createSlice } from "@reduxjs/toolkit";

const transcationSlice = createSlice({
  name: "transcation",
  initialState: {
    transactions: [],
    transaction: null
  },
  reducers: {
    index: (state, action) => {
      state.transactions = action.payload
      return state;
    },
    
    show: (state, action) => {
      state.transaction = {...action.payload }
      return state;
    }
  },
});

export const {
  index,
  show
} = transcationSlice.actions;
export default transcationSlice.reducer;

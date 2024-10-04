import { createSlice } from "@reduxjs/toolkit";

const depositSlice = createSlice({
  name: "deposit",
  initialState: {
    deposits: [],
    deposit: null
  },
  reducers: {
    index: (state, action) => {
      state.deposits = action.payload
      return state;
    },
    show: (state, action) => {
      state.deposit = {...action.payload }
      return state;
    },
    setDepositIndex: (state, action) => {
      state.deposits = action.payload
      return state;
    },
  },
});

export const {
  index,
  show,
  setDepositIndex
} = depositSlice.actions;
export default depositSlice.reducer;

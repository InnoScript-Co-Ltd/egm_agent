import { createSlice } from "@reduxjs/toolkit";

const bankAccountSlice = createSlice({
  name: "bankAccount",
  initialState: {
    bankAccounts: [],
    bankAccount: null
  },
  reducers: {
    index: (state, action) => {
      state.bankAccounts = action.payload
      return state;
    },
    show: (state, action) => {
      state.bankAccount = {...action.payload }
      return state;
    },
    setBankIndex: (state, action) => {
      state.bankAccounts = action.payload;
    }
  },
});

export const {
  index,
  show,
  setBankIndex
} = bankAccountSlice.actions;
export default bankAccountSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const investorSlice = createSlice({
  name: "investor",
  initialState: {
    investors: [],
    investor: null,
    register: null
  },
  reducers: {
    setRegister: (state, action) => {
      state.register = { ...action.payload };
      return state;
    },

    setInvestors: (state, action) => {
      state.investors = action.payload;
      return state;
    },

    setInvestor: (state, action) => {
      state.investor = { ...action.payload };
      return state;
    }
  },
});

export const {
  setRegister,
  setInvestors,
  setInvestor
} = investorSlice.actions;
export default investorSlice.reducer;

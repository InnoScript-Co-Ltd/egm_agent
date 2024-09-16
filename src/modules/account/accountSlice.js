import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: null,
    user: null,
    bankAccounts: [],
    referrals: []
  },
  reducers: {
    setBankAccount: (state, action) => {
      state.bankAccounts = action.payload;
      return state;
    },

    register: (state, action) => {
      state.account = { ...action.payload }
      return state;
    },

    profile: (state, action) => {
      state.user = {...action.payload }
      return state;
    },

    setReferral: (state, action) => {
      state.referrals = action.payload;
    }
  },
});

export const {
  register,
  profile,
  setBankAccount,
  setReferral
} = accountSlice.actions;
export default accountSlice.reducer;

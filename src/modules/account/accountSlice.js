import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: null,
    user: null,
    bankAccounts: []
  },
  reducers: {
    setBankAccount: (state, action) => {
      state.bankAccounts = action.payload;
      return state;
    },

    register: (state, action) => {
      state.account = { ...action.payload}
      return state;
    },

    profile: (state, action) => {
      state.user = {...action.payload }
      return state;
    }
  },
});

export const {
  register,
  profile,
  setBankAccount
} = accountSlice.actions;
export default accountSlice.reducer;

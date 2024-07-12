import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: null,
    user: null
  },
  reducers: {
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
  profile
} = accountSlice.actions;
export default accountSlice.reducer;

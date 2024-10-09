import { createSlice } from "@reduxjs/toolkit";

const referralSlice = createSlice({
  name: "referral",
  initialState: {
    referrals: [],
    referral: null
  },
  reducers: {
    setReferralIndex: (state, action) => {
      state.referrals = action.payload
      return state;
    },
    
    setReferral: (state, action) => {
      state.referral = {...action.payload }
      return state;
    }
  },
});

export const {
  setReferralIndex,
  setReferral
} = referralSlice.actions;
export default referralSlice.reducer;

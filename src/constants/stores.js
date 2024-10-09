import { configureStore } from "@reduxjs/toolkit";
import shareSlice from "./shareSlice";
import accountSlice from "../modules/account/accountSlice";
import authSlice from "../modules/auth/authSlice";
import packageSlice from "../modules/packages/packageSlice";
import bankAccountSlice from "../modules/bankAccount/bankAccountSlice";
import transcationSlice from "../modules/transcation/transcationSlice";
import agentSlice from "../modules/agent/agentSlice";
import depositSlice from "../modules/deposit/depositSlice";
import repaymentSlice from "../modules/repayment/repaymentSlice";
import referralSlice from "../modules/referral/referralSlice";

export const stores = configureStore({
   reducer: {
      share: shareSlice,
      account: accountSlice,
      auth: authSlice,
      package: packageSlice,
      bankAccount: bankAccountSlice,
      transaction: transcationSlice,
      agent: agentSlice,
      deposit: depositSlice,
      repayment: repaymentSlice,
      referral: referralSlice
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
  })
})
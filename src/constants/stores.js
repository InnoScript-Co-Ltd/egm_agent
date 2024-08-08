import { configureStore } from "@reduxjs/toolkit";
import shareSlice from "./shareSlice";
import accountSlice from "../modules/account/accountSlice";
import authSlice from "../modules/auth/authSlice";
import packageSlice from "../modules/packages/packageSlice";
import bankAccountSlice from "../modules/bankAccount/bankAccountSlice";
import transcationSlice from "../modules/transcation/transcationSlice";
import agentSlice from "../modules/agent/agentSlice";

export const stores = configureStore({
   reducer: {
      share: shareSlice,
      account: accountSlice,
      auth: authSlice,
      package: packageSlice,
      bankAccount: bankAccountSlice,
      transcation: transcationSlice,
      agent: agentSlice,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
  })
})
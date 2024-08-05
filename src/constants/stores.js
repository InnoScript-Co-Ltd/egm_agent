import { configureStore } from "@reduxjs/toolkit";
import shareSlice from "./shareSlice";
import accountSlice from "../modules/account/accountSlice";
import authSlice from "../modules/auth/authSlice";
import packageSlice from "../modules/packages/packageSlice";
import bankAccountSlice from "../modules/bankAccount/bankAccountSlice";
import investorSlice from "../modules/investor/investorSlice";
import transcationSlice from "../modules/transcation/transcationSlice";
import subAgentSlice from "../modules/subAgent/subAgentSlice";
import channelSlice from "../modules/channel/channelSlice";

export const stores = configureStore({
   reducer: {
      share: shareSlice,
      account: accountSlice,
      auth: authSlice,
      package: packageSlice,
      bankAccount: bankAccountSlice,
      investor: investorSlice,
      transcation: transcationSlice,
      subAgent: subAgentSlice,
      channel: channelSlice
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
  })
})
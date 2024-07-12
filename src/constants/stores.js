import { configureStore } from "@reduxjs/toolkit";
import shareSlice from "./shareSlice";
import accountSlice from "../modules/account/accountSlice";
import authSlice from "../modules/auth/authSlice";

export const stores = configureStore({
   reducer: {
      share: shareSlice,
      account: accountSlice,
      auth: authSlice
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
  })

})
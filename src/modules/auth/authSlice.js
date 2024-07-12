import { createSlice } from "@reduxjs/toolkit";
import { getData, setData } from "../../libs/localstorage";
import { keys } from "../../constants/config";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: getData(keys.API_TOKEN) ? getData(keys.API_TOKEN) : null,
    id: getData(keys.ID) ? getData(keys.ID) : null
  },
  reducers: {
    login: (state, action) => {
      setData(keys.API_TOKEN, action.payload.access_token);
      setData(keys.ID, action.payload.user.id);
      state.id = action.payload.user.id;
      state.token = action.payload.access_token;
      return state;
    }
  },
});

export const {
  login
} = authSlice.actions;
export default authSlice.reducer;

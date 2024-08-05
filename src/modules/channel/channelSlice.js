import { createSlice } from "@reduxjs/toolkit";

const channelSlice = createSlice({
  name: "channel",
  initialState: {
    channels: [],
    channel: null
  },
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload
      return state;
    },
    setChannel: (state, action) => {
      state.channel = { ...action.payload }
      return state;
    }
  },
});

export const {
  setChannels,
  setChannel
} = channelSlice.actions;
export default channelSlice.reducer;

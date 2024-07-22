import { createSlice } from "@reduxjs/toolkit";

const transcationSlice = createSlice({
  name: "transcation",
  initialState: {
    agent_transcation: [],
    investor_transcation: []
  },
  reducers: {
    agentTranscation: (state, action) => {
      state.agent_transcation = action.payload
      return state;
    },
    invetorTranscation: (state, action) => {
      state.investor_transcation = action.payload
      return state;
    }
  },
});

export const {
  agentTranscation,
  invetorTranscation
} = transcationSlice.actions;
export default transcationSlice.reducer;

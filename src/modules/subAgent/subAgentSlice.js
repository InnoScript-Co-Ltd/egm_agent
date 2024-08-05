import { createSlice } from "@reduxjs/toolkit";

const subAgentSlice = createSlice({
  name: "subAgent",
  initialState: {
    subAgents: [],
    subAgent: null,
  },
  reducers: {
    setSubAgents: (state, action) => {
      state.subAgents = action.payload;
      return state;
    },

    setSubAgent: (state, action) => {
      state.subAgent = { ...action.payload };
      return state;
    }
  },
});

export const {
  setSubAgent, setSubAgents
} = subAgentSlice.actions;
export default subAgentSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const agentSlice = createSlice({
  name: "agent",
  initialState: {
    subAgents: [],
    agents: [],
    subAgent: null,
    agent: null
  },
  reducers: {
    setLevelAgents: (state, action) => {
      state.agents = action.payload;
    },

    setSubAgents: (state, action) => {
      state.subAgents = action.payload;
      return state;
    },

    setSubAgent: (state, action) => {
      state.subAgent = { ...action.payload };
      return state;
    },

    setAgent: (state, action) => {
      state.agent = {...action.payload };
      return state;
    }
  },
});

export const {
  setSubAgent, setSubAgents, setLevelAgents, setAgent
} = agentSlice.actions;
export default agentSlice.reducer;

import { endpoints } from "../../constants/endpoints";
import { updateNotification } from "../../constants/shareSlice";
import { getRequest, postRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { setSubAgents, setLevelAgents, setAgent } from "./agentSlice";

export const agentServices = {
    levelAgentIndex: async(dispatch, level) => {
        const result = await getRequest(`${endpoints.levelAgent}/${level}`);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(setLevelAgents(result.data));
        }
        
        return result;
    },

    index: async (dispatch) => {
        const result = await getRequest(endpoints.subAgent);
        await httpServiceHandler(dispatch, result); 
        if(result.status === 200) {
            dispatch(setSubAgents(result.data));
        }
        return result;
    },

    show: async (dispatch, id) => {
        const result = await getRequest(`${endpoints.agent}/${id}`, dispatch);
        await httpServiceHandler(dispatch, result); 
        if(result.status === 200) {
            dispatch(setAgent(result.data));
        }
        return result;
    },

    store: async (payload, dispatch) => {
        const result = await postRequest(endpoints.subAgent, payload);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(updateNotification( {
                show: true,
                summary: "Success",
                severity: "success",
                detail: result.message
            }));
        }
        return result;
    }
}
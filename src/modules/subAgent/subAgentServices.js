import { endpoints } from "../../constants/endpoints";
import { updateNotification } from "../../constants/shareSlice";
import { getRequest, postRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { setSubAgents, setSubAgent } from "./subAgentSlice";

export const subAgentServices = {
    index: async (dispatch) => {
        const result = await getRequest(endpoints.subAgent);
        await httpServiceHandler(dispatch, result); 
        if(result.status === 200) {
            dispatch(setSubAgents(result.data));
        }
        return result;
    },

    show: async (id, dispatch) => {
        const result = await getRequest(`${endpoints.subAgent}/${id}`, dispatch);
        await httpServiceHandler(dispatch, result); 
        if(result.status === 200) {
            dispatch(setSubAgent(result.data));
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
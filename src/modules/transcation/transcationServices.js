import { endpoints } from "../../constants/endpoints";
import { getRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { agentTranscation, invetorTranscation } from "./transcationSlice";

export const transcationServices = {
    agent: async (dispatch) => {
        const result = await getRequest(endpoints.agentPackage);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(agentTranscation(result.data));
        }
        return result;
    },

    investor: async (dispatch) => {
        const result = await getRequest(endpoints.investorPackage);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(invetorTranscation(result.data));
        }

        return result;
    },
}
import { endpoints } from "../../constants/endpoints";
import { updateNotification } from "../../constants/shareSlice";
import { getRequest, postRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { index, show } from "./packageSlice";

export const packageServices = {
    index: async (dispatch) => {
        const result = await getRequest(endpoints.package);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(index(result.data));
        }
        return result;
    },

    show: async (dispatch, id) => {
        const result = await getRequest(`${endpoints.package}/${id}`);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(show(result.data));
        }
    },

    agentPackageBuy: async (dispatch, payload) => {
        const result = await postRequest(endpoints.agentPackage, payload);
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
    },

    investorPackageBuy: async (dispatch, payload) => {
        const result = await postRequest(endpoints.investorPackage, payload);
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
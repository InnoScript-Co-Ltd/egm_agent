import { endpoints } from "../../constants/endpoints";
import { updateNotification } from "../../constants/shareSlice";
import { getRequest, postRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { setInvestor, setInvestors, setRegister } from "./investorSlice";

export const investorServices = {
    index: async (dispatch) => {
        const result = await getRequest(endpoints.invsetor);
        await httpServiceHandler(dispatch, result); 
        if(result.status === 200) {
            dispatch(setInvestors(result.data));
        }
        return result;
    },

    show: async (id, dispatch) => {
        const result = await getRequest(`${endpoints.invsetor}/${id}`, dispatch);
        await httpServiceHandler(dispatch, result); 
        if(result.status === 200) {
            dispatch(setInvestor(result.data));
        }
        return result;
    },

    store: async (payload, dispatch) => {
        const result = await postRequest(endpoints.invsetor, payload);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(updateNotification( {
                show: true,
                summary: "Success",
                severity: "success",
                detail: result.message
            }));
            dispatch(setRegister(result.data));
        }
        return result;
    },

    verifyCode: async (payload, dispatch) => {
        const result = await postRequest(`${endpoints.invsetor}/verify-code`, payload);
        await httpServiceHandler(dispatch, result);
        if(result.status === 200) {
            dispatch(updateNotification( {
                show: true,
                summary: "Success",
                severity: "success",
                detail: result.message
            }));
            dispatch(setRegister(null));
        }
        return result;
    },

    resendCode: async (payload, dispatch) => {
        const result = await postRequest(`${endpoints.invsetor}/resend-code`, payload);
        await httpServiceHandler(dispatch, result);
        if(result.status === 200) {
            dispatch(updateNotification( {
                show: true,
                summary: "Success",
                severity: "success",
                detail: result.message
            }));
            dispatch(setRegister(result.data));
        }
        return result;
    }, 
}
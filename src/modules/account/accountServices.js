import { endpoints } from "../../constants/endpoints";
import { updateNotification } from "../../constants/shareSlice";
import { getRequest, postRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { register, profile } from "./accountSlice";

export const accountServices = {
    register: async (payload, dispatch) => {
        const result = await postRequest(endpoints.register, payload);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(updateNotification( {
                show: true,
                summary: "Success",
                severity: "success",
                detail: result.message
            }));
            dispatch(register(result.data));
        }
        return result;
    },
    resendCode: async (payload, dispatch) => {
        const result = await postRequest(endpoints.resendCode, payload);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(updateNotification( {
                show: true,
                summary: "Success",
                severity: "success",
                detail: result.message
            }));
            dispatch(register(result.data));
        }

        return result;
    },
    verification: async (payload, dispatch) => {
        const result = await postRequest(endpoints.verification, payload);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(updateNotification( {
                show: true,
                summary: "Success",
                severity: "success",
                detail: result.message
            }));
            dispatch(register(null));
        }
        return result;
    },
    profile: async (dispatch) => {
        const result  = await getRequest(endpoints.profile);
        await httpServiceHandler(dispatch, result);
        if(result.status === 200) {
            dispatch(profile(result.data));
        }
        return result;
    }
}
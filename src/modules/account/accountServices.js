import { endpoints } from "../../constants/endpoints";
import { updateNotification } from "../../constants/shareSlice";
import { getRequest, postRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { register, profile } from "./accountSlice";

export const accountServices = {
    mainAgentRegister: async (payload, token, dispatch) => {
        const result = await postRequest(`${endpoints.mainAgentRegister}?reference=${token}`, payload);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail: result.message
            }));
        }

        return result;
    },

    subAgentRegister: async (payload, token, dispatch) => {
        const result = await postRequest(`${endpoints.subAgentRegister}?reference=${token}`, payload);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail: result.message
            }));
        }

        return result;
    },

    resendCode: async (payload, dispatch) => {
        const result = await postRequest(endpoints.resendCode, payload);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            dispatch(updateNotification({
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

        if (result.status === 200) {
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail: result.message
            }));
        }

        return result;
    },

    changePassword: async (payload, dispatch) => {
        const result = await postRequest(endpoints.changePassword, payload);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail: result.message
            }));
        }

        return result;
    },

    profile: async (dispatch) => {
        const result = await getRequest(endpoints.profile);
        await httpServiceHandler(dispatch, result);
        if (result.status === 200) {
            dispatch(profile(result.data));
        }

        return result;
    },

    mainAgentGenerateLink: async (dispatch) => {
        const result = await getRequest(endpoints.mainAgentRefrenceLink);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail: result.message
            }));
        }

        return result;
    },

    subAgentGenerateLink: async (dispatch) => {
        const result = await getRequest(endpoints.subAgentRefrenceLink);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail: result.message
            }));
        }

        return result;
    },

    updateProfile: async (payload, id, dispatch) => {
        const result = await postRequest(`${endpoints.profileUpdate}/${id}`, payload);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail: result.message
            }));
        }

        return result;
    },

    updateKyc: async (payload, id, dispatch) => {
        const result = await postRequest(`${endpoints.profileUpdate}/${id}/kyc-update`, payload);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail: result.message
            }));
        }

        return result;
    },

    updateAccount: async (payload, id, dispatch) => {
        const result = await postRequest(`${endpoints.profileUpdate}/${id}/account-update`, payload);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail: result.message
            }));
        }

        return result;
    },

    updatePaymentPassword: async (payload, dispatch) => {
        const result = await postRequest(endpoints.paymentPassword, payload);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail: result.message
            }));
        }

        return result;
    }
}
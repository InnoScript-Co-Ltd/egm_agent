import { endpoints } from "../../constants/endpoints";
import { updateNotification } from "../../constants/shareSlice";
import { delRequest, getRequest, postRequest, updateRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { register, profile, setBankAccount, setReferral } from "./accountSlice";

export const accountServices = {
    register: async (payload, dispatch) => {
        const result = await updateRequest(endpoints.register, payload);
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

    generateReferralLink: async (dispatch) => {
        const result = await postRequest(endpoints.referral);
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

    updateProfile: async (payload, dispatch) => {

        const result = await updateRequest(endpoints.profileUpdate, payload);
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

    updateKyc: async (payload, dispatch) => {
        const result = await updateRequest(`${endpoints.profileUpdate}/kyc`, payload);
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

    updateAccount: async (payload, dispatch) => {
        const result = await postRequest(`${endpoints.profileUpdate}/account-update`, payload);
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
    },

    createBankAccount: async (payload, dispatch) => {
        const result = await postRequest(endpoints.bankAccount, payload);
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

    bankAccountIndex: async (dispatch) => {
        const result = await getRequest(endpoints.bankAccount);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            await dispatch(setBankAccount(result.data));
        }

        return result;
    },

    checkPaymemntPassword: async (payload, dispatch) => {
        const result = await postRequest(endpoints.paymentPasswordCheck, payload);
        await httpServiceHandler(dispatch, result);
        return result;
    },

    delBankAccount: async (id, dispatch) => {
        const result = await delRequest(`${endpoints.bankAccount}/${id}`);
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

    referrals: async (dispatch) => {
        const result = await getRequest(endpoints.referral);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            dispatch(setReferral(result.data));
        }

        return result;
    }
}
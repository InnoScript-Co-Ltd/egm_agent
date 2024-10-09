import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";

export const referralService = {
    check: async (dispatch, referral) => {
        const result = await getRequest(`${endpoints.referral}/check/${referral}`);
        await httpServiceHandler(dispatch, result);
        return result;
    },

    store: async (dispatch, payload) => {
        const result = await postRequest(`${endpoints.referral}`, payload);
        await httpServiceHandler(dispatch, result);
        return result;
    }
}
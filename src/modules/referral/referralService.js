import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { setReferralIndex } from "./referralSlice";

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
    },

    index: async (dispatch) => {
        const result = await getRequest(endpoints.referral);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            console.log(result);
            dispatch(setReferralIndex(result.data.data ? result.data.data : result.data));
        }

        return result;
    }
}
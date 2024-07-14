import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { index, show } from "./bankAccountSlice";

export const bankAccountServices = {
    index: async (dispatch) => {
        const result = await getRequest(endpoints.bankAccount);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(index(result.data));
        }
        return result;
    },

    show: async (dispatch, id) => {
        const result = await getRequest(`${endpoints.bankAccount}/${id}`);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(show(result.data));
        }

        return result;
    },

    store: async (dispatch, payload) => {
        const result = await postRequest(`${endpoints.bankAccount}`, payload);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            const bankAccountList = await getRequest(`${endpoints.bankAccount}`);

            if(bankAccountList.status === 200) {
                dispatch(index(bankAccountList.data));
            }
        }

        return result;
    }
}
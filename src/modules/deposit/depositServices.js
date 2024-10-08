import { endpoints } from "../../constants/endpoints";
import { updateNotification } from "../../constants/shareSlice";
import { getRequest, updateRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { index } from "./depositSlice";

export const depositServices = {

    packages: async (dispatch) => {
        const result = await getRequest(endpoints.package);
        await httpServiceHandler(dispatch, result);
        return result;
    },

    bankAccount: async (dispatch) => {
        const result = await getRequest(endpoints.bankAccount);
        await httpServiceHandler(dispatch, result);
        return result;
    },

    merchantBankAccount: async (dispatch) => {
        const result = await getRequest(endpoints.merchantBankAccount);
        await httpServiceHandler(dispatch, result);
        return result;
    },

    show: async (id, dispatch) => {
        const result = await getRequest(`${endpoints.subAgent}/${id}`, dispatch);
        await httpServiceHandler(dispatch, result);
        if (result.status === 200) {
            // dispatch(setSubAgent(result.data));
        }
        return result;
    },

    index: async (dispatch) => {
        const result = await getRequest(`${endpoints.deposit}`);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(index(result.data));
        }
    },

    store: async (payload, dispatch) => {
        const result = await updateRequest(endpoints.deposit, payload);
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
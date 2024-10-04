import { endpoints } from "../../constants/endpoints";
import { getRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { index } from "./repaymentSlice";

export const repaymentServices = {

    index: async (dispatch, id) => {
        const result = await getRequest(`${endpoints.repayment}/deposit/${id}?order=id&sort=ASC`);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(index(result.data));
        }
        return result;
    },

    indexthisMonth: async (dispatch, month) => {
        const result = await getRequest(`${endpoints.repayment}/month/${month}}?order=id&sort=ASC`);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(index(result.data));
        }
        return result;
    }
}
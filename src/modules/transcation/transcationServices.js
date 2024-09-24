import { endpoints } from "../../constants/endpoints";
import { getRequest, updateRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { index, show } from "./transcationSlice";

export const transcationServices = {
    store: async (dispatch, payload) => {
        const result = await updateRequest(`${endpoints.transaction}`, payload);
        await httpServiceHandler(dispatch, result);
        return result;
    },

    index: async (dispatch, transcationStatus) => {
        const result = await getRequest(`${endpoints.transaction}?filter=status&value=${transcationStatus}`);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(index(result.data));
        }
        
        return result;
    },

    show: async (dispatch, id) => {
        const result = await getRequest(`${endpoints.transaction}/${id}`);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(show(result.data));
        }
        
        return result;
    }
}
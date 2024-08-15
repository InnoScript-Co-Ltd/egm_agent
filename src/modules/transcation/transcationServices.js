import { endpoints } from "../../constants/endpoints";
import { getRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { index } from "./transcationSlice";

export const transcationServices = {
    index: async (dispatch, transcationStatus) => {
        const result = await getRequest(`${endpoints.deposit}?filter=status&value=${transcationStatus}`);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(index(result.data));
        }
        
        return result;
    },
}
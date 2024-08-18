import { endpoints } from "../../constants/endpoints";
import { getRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";

export const dashboardService = {

    index: async (dispatch) => {
        const result = await getRequest(endpoints.dashboard);
        await httpServiceHandler(dispatch, result);
        return result;
    },

}
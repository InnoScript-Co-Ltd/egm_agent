import { endpoints } from "../constants/endpoints";
import { updateNotification } from "../constants/shareSlice";
import { postRequest } from "../helpers/api";
import { httpServiceHandler } from "../helpers/handler";
import { login } from "./auth/authSlice";

export const authServices = {
    login: async (payload, dispatch) => {
        const result = await postRequest(endpoints.login, payload);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(login(result.data));
            dispatch(updateNotification( {
                show: true,
                summary: "Success",
                severity: "success",
                detail: result.message
            }));
        }

        return result;
    }
}
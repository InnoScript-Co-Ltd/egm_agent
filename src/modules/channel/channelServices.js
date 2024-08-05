import { endpoints } from "../../constants/endpoints";
import { updateNotification } from "../../constants/shareSlice";
import { delRequest, getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { setChannel, setChannels } from "./channelSlice";

export const channelServices = {
    store: async (dispatch, payload) => {
        const result = await postRequest(endpoints.channel, payload);
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

    index: async (dispatch) => {
        const result = await getRequest(endpoints.channel);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            dispatch(setChannels(result.data));
        }
        return result;
    },

    show: async (dispatch, id) => {
        const result = await getRequest(`${endpoints.channel}/${id}`);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            dispatch(setChannel(result.data));
        }
        return result;
    },

    update: async (dispatch, payload, id) => {
        const result = await putRequest(`${endpoints.channel}/${id}`, payload);

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

    destroy: async (dispatch, id) => {
        const result = await delRequest(`${endpoints.channel}/${id}`);

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
import axios from 'axios';
import { getData } from './localstorage';
import { baseUrl, keys } from '../constants/config';


axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

const http = axios.create({
    baseURL: `${baseUrl}/agent`
});

http.interceptors.request.use(
    (config) => {
        const token = getData(keys.API_TOKEN) ? getData(keys.API_TOKEN) : null;

        if (token) {
            config.headers = {
                ...config.headers,
                authorization: `Bearer ${token}`,
                Accept: "Application/json",
            };
        }

        return config;

    },
    (error) => {
        return Promise.reject(error)
    }
);

export default http;
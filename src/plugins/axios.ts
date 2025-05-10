import axios from "axios";
import {
    getCookie
} from '../services/auth.service';

export const backendURLApi = () => import.meta.env.VITE_URL_API;

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = `${backendURLApi()}`;

axios.interceptors.request.use(
    function (config) {
        const token = getCookie("token");
        if (token) config.headers['Authorization'] = token;
        return config;
    }, function (error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
        return response;
    }, 
    function (error) {
        if (error.response && error.response.status === 401) {
            sessionStorage.setItem('sessionExpired', 'true');
            location.reload();
        }else{
            return error.response;
        }
    }
);

const install = (app: any) => {
    app.config.globalProperties.$HTTP = axios;
};

export const HTTP = axios;

export default install;
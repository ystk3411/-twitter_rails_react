import axios from 'axios'
import Cookies from 'js-cookie';

export const instance = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  timeout: 1000
});

instance.interceptors.request.use(function (config) {
  config.headers = {
    "access-token": Cookies.get("accessToken"),
    "client": Cookies.get("client"),
    "uid": Cookies.get("uid")}
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default instance;

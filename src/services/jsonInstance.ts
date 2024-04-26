import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

instance.defaults.headers.common["Content-Type"] = `application/json`;
instance.defaults.headers.common.Accept = `application/json`;
instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

instance.interceptors.request.use(request => request);

instance.interceptors.response.use(response => response);

export default instance;

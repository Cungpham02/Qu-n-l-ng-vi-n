import axios from "axios";
const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
httpRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const post = async (path, options = {}) => {
  const response = await httpRequest.post(path, options);
  return response.data;
};
export const get = async (path) => {
  const response = await httpRequest.get(path);
  return response.data;
};
export default httpRequest;

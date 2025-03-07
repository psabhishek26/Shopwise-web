import axios from "axios";
import { BACKEND_API } from "../constants/ApiConstant";
import { getToken } from "../Store";

const axiosInstance = axios.create({
  baseURL: BACKEND_API.BACKEND_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
      return Promise.reject(error.response.data);
    }

    if (error.request) {
      return Promise.reject({
        message: "Network error occurred. Please check your connection.",
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

import axios from "axios";
import { BASE_URL } from "./helper.service";
import { getTokenFromLocalStorage } from "../auth/helper.auth";

export const publicAxios = axios.create({
  baseURL: BASE_URL,
});

export const privateAxois = axios.create({
  baseURL: BASE_URL,
});

privateAxois.interceptors.request.use(
  (config) => {
    const token = getTokenFromLocalStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

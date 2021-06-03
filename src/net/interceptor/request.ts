import { AxiosRequestConfig } from "axios";
import { store } from "@/store";

export const onRequestFulfilled = (config: AxiosRequestConfig) => {
  if (!config.headers["Authorization"]) {
    const accessToken = store.getters.accessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }
  return config;
};

export const onRequestRejected = (error: unknown) => {
  return Promise.reject(error);
};

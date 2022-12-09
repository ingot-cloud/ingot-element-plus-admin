import type { AxiosRequestConfig, AxiosError } from "axios";
import { getAccessToken } from "@/stores/modules/auth";

export const onRequestFulfilled = (
  config: AxiosRequestConfig
): AxiosRequestConfig => {
  if (!config.permit) {
    config.headers = config.headers || {};
    if (!config.headers["Authorization"] && getAccessToken.value) {
      config.headers["Authorization"] = getAccessToken.value;
    }
  }
  return config;
};

export const onRequestRejected = (error: AxiosError): Promise<void> => {
  return Promise.reject(error);
};

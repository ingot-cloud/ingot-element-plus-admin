import { AxiosRequestConfig } from "axios";

export const onRequestFulfilled = (config: AxiosRequestConfig) => {
  return config;
};

export const onRequestRejected = (error: unknown) => {
  return Promise.reject(error);
};

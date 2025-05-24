import type { InternalAxiosRequestConfig, AxiosError } from "axios";
import { useAuthStore } from "@/stores/modules/auth";

export const onRequestFulfilled = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  config.headers = config.headers || {};
  if (!config.permit) {
    if (!config.headers["Authorization"]) {
      const getAccessToken = storeToRefs(useAuthStore()).getAccessToken;
      if (getAccessToken.value) {
        config.headers["Authorization"] = getAccessToken.value;
      }
    }
  }

  if (!config.ignoreTenant) {
    if (!config.headers["Tenant"]) {
      config.headers["Tenant"] = storeToRefs(useAuthStore()).getOrg.value;
    }
  }
  return config;
};

export const onRequestRejected = (error: AxiosError): Promise<void> => {
  return Promise.reject(error);
};

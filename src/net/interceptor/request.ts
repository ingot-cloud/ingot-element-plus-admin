import type { AxiosRequestConfig, AxiosError } from "axios";
import { useAuthStore } from "@/stores/modules/auth";
import { useAppStore } from "@/stores/modules/app";

export const onRequestFulfilled = (
  config: AxiosRequestConfig
): AxiosRequestConfig => {
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
    const { getTenant } = storeToRefs(useAppStore());
    config.headers["Tenant"] = getTenant.value;
  }
  return config;
};

export const onRequestRejected = (error: AxiosError): Promise<void> => {
  return Promise.reject(error);
};

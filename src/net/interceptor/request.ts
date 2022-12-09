import type { AxiosRequestConfig, AxiosError } from "axios";
import { getAccessToken } from "@/stores/modules/auth";
import { useAppStore } from "@/stores/modules/app";
import { storeToRefs } from "pinia";

const { getTenant } = storeToRefs(useAppStore());

export const onRequestFulfilled = (
  config: AxiosRequestConfig
): AxiosRequestConfig => {
  config.headers = config.headers || {};
  if (!config.permit) {
    if (!config.headers["Authorization"] && getAccessToken.value) {
      config.headers["Authorization"] = getAccessToken.value;
    }
  }

  config.headers["Tenant"] = getTenant.value;
  return config;
};

export const onRequestRejected = (error: AxiosError): Promise<void> => {
  return Promise.reject(error);
};

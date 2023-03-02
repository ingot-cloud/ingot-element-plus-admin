import type { AxiosRequestConfig, AxiosError } from "axios";
import { useAuthStore } from "@/stores/modules/auth";
import { useTenantStore } from "@/stores/modules/tenant";

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
    if (!config.headers["Tenant"]) {
      const { getGlobalTenant } = storeToRefs(useTenantStore());
      config.headers["Tenant"] = getGlobalTenant.value;
    }
  }
  return config;
};

export const onRequestRejected = (error: AxiosError): Promise<void> => {
  return Promise.reject(error);
};

import { AxiosRequestConfig } from "axios";
import { getAccessToken } from "@/store/composition/auth";
import { globalTenant } from "@/store/composition/tenant";

export const onRequestFulfilled = (
  config: AxiosRequestConfig
): AxiosRequestConfig => {
  if (!config.permit && !config.headers["Authorization"]) {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }
  const tenant = globalTenant();
  if (tenant) {
    config.headers["Tenant"] = tenant;
  }
  return config;
};

export const onRequestRejected = (error: unknown): Promise<void> => {
  return Promise.reject(error);
};

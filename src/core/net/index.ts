import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { NetConfig } from "@/config";
import { onRequestFulfilled, onRequestRejected } from "./interceptor/request";
import {
  onResponseFulfilled,
  onResponseRejected
} from "./interceptor/response";
import { IngotResponse } from "@/core/model";

class Http {
  private instance: AxiosInstance;
  public constructor() {
    this.instance = axios.create({
      timeout: NetConfig.RequestTimeout
    });
    // default interceptors
    this.instance.interceptors.request.use(
      onRequestFulfilled,
      onRequestRejected
    );
    this.instance.interceptors.response.use(
      onResponseFulfilled,
      onResponseRejected
    );
  }

  request<T = any, R = AxiosResponse<IngotResponse<T>>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.request<T, R>(config);
  }
  get<T = any, R = AxiosResponse<IngotResponse<T>>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.get<T, R>(url, config);
  }
  delete<T = any, R = AxiosResponse<IngotResponse<T>>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.delete<T, R>(url, config);
  }
  head<T = any, R = AxiosResponse<IngotResponse<T>>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.head<T, R>(url, config);
  }
  options<T = any, R = AxiosResponse<IngotResponse<T>>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.options<T, R>(url, config);
  }
  post<T = any, R = AxiosResponse<IngotResponse<T>>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.post<T, R>(url, data, config);
  }
  put<T = any, R = AxiosResponse<IngotResponse<T>>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.put<T, R>(url, data, config);
  }
  patch<T = any, R = AxiosResponse<IngotResponse<T>>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.patch<T, R>(url, data, config);
  }
}

export default new Http();

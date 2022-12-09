import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { onRequestFulfilled, onRequestRejected } from "./interceptor/request";
import {
  onResponseFulfilled,
  onResponseRejected,
} from "./interceptor/response";
import type { R } from "@/models/net";
import NProgress from "@/components/nprogress";
import { useAppStore } from "@/stores/modules/app";

class Http {
  private instance: AxiosInstance;
  public constructor() {
    const { app } = useAppStore();
    this.instance = axios.create({
      baseURL: app.netConfig.baseURL,
      timeout: app.netConfig.timeout,
      timeoutErrorMessage: app.netConfig.timeoutErrorMessage,
    });

    // default interceptors
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        NProgress.start();
        return onRequestFulfilled(config);
      },
      (error: AxiosError) => {
        return onRequestRejected(error);
      }
    );
    this.instance.interceptors.response.use(
      (response: AxiosResponse<R>) => {
        NProgress.done();
        return onResponseFulfilled(response);
      },
      (error: AxiosError<R>) => {
        NProgress.done();
        return onResponseRejected(error);
      }
    );
  }

  get<T = any>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<R<T>> {
    config = config || {};
    if (params) {
      config.params = Object.assign({}, config.params, params);
    }
    return this.instance.get<T, R<T>>(url, config);
  }

  delete<T = any>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<R<T>> {
    config = config || {};
    if (params) {
      config.data = Object.assign({}, config.data, params);
    }
    return this.instance.delete<T, R<T>>(url, config);
  }

  post<T = any>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<R<T>> {
    return this.instance.post<T, R<T>>(url, params, config);
  }

  put<T = any>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<R<T>> {
    return this.instance.put<T, R<T>>(url, params, config);
  }

  patch<T = any>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<R<T>> {
    return this.instance.patch<T, R<T>>(url, params, config);
  }

  head<T = any>(url: string, config?: AxiosRequestConfig): Promise<R<T>> {
    return this.instance.head<T, R<T>>(url, config);
  }

  options<T = any>(url: string, config?: AxiosRequestConfig): Promise<R<T>> {
    return this.instance.options<T, R<T>>(url, config);
  }

  postForm<T = any>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<R<T>> {
    return this.instance.postForm(url, params, config);
  }

  putForm<T = any>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<R<T>> {
    return this.instance.putForm(url, params, config);
  }

  patchForm<T = any>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<R<T>> {
    return this.instance.patchForm(url, params, config);
  }
}

export default new Http();

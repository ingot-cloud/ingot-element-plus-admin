import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { NetConfig } from "@/config";
import { onRequestFulfilled, onRequestRejected } from "./interceptor/request";
import {
  onResponseFulfilled,
  onResponseRejected
} from "./interceptor/response";
import { IngotResponse } from "@/core/model";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({
  showSpinner: false
});

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
    // progress
    this.instance.interceptors.request.use(config => {
      NProgress.start();
      return config;
    });
    this.instance.interceptors.response.use(
      response => {
        NProgress.done();
        return response;
      },
      e => {
        console.log("eerrr", e);
        NProgress.done();
        return e;
      }
    );
  }

  /**
   * 重构响应结构，转换为Promise<IngotResponse>
   * @param origin 请求原始返回的Promise
   */
  restructure<T>(
    origin: Promise<AxiosResponse<IngotResponse<T>>>
  ): Promise<IngotResponse<T>> {
    return new Promise((resolve, reject) => {
      origin
        .then(response => {
          const result = response.data;
          result.headers = response.headers;
          resolve(result);
        })
        .catch(err => {
          const result = err.data;
          result.headers = err.headers;
          reject(result);
        });
    });
  }

  // 代理 Axios 请求方法

  request<T = any>(config: AxiosRequestConfig): Promise<IngotResponse<T>> {
    return this.restructure<T>(
      this.instance.request<T, AxiosResponse<IngotResponse<T>>>(config)
    );
  }
  get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<IngotResponse<T>> {
    return this.restructure<T>(
      this.instance.get<T, AxiosResponse<IngotResponse<T>>>(url, config)
    );
  }
  delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<IngotResponse<T>> {
    return this.restructure<T>(
      this.instance.delete<T, AxiosResponse<IngotResponse<T>>>(url, config)
    );
  }
  head<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<IngotResponse<T>> {
    return this.restructure<T>(
      this.instance.head<T, AxiosResponse<IngotResponse<T>>>(url, config)
    );
  }
  options<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<IngotResponse<T>> {
    return this.restructure<T>(
      this.instance.options<T, AxiosResponse<IngotResponse<T>>>(url, config)
    );
  }
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<IngotResponse<T>> {
    return this.restructure<T>(
      this.instance.post<T, AxiosResponse<IngotResponse<T>>>(url, data, config)
    );
  }
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<IngotResponse<T>> {
    return this.restructure<T>(
      this.instance.put<T, AxiosResponse<IngotResponse<T>>>(url, data, config)
    );
  }
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<IngotResponse<T>> {
    return this.restructure<T>(
      this.instance.patch<T, AxiosResponse<IngotResponse<T>>>(url, data, config)
    );
  }
}

export default new Http();

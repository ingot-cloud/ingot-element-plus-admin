import type { AxiosRequestConfig, Canceler } from "axios";
import qs from "qs";
import axios from "axios";
import { isFunction } from "@/utils";

class CancelManager {
  private pendingMap: Map<string, Canceler>;
  constructor() {
    this.pendingMap = new Map<string, Canceler>();
  }

  /**
   * 添加请求
   */
  addPending(config?: AxiosRequestConfig) {
    if (!config) {
      return;
    }
    // * 在请求开始前，对之前的请求做检查取消操作
    this.removePending(config);
    const url = this.getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!this.pendingMap.has(url)) {
          // 如果 pending 中不存在当前请求，则添加进去
          this.pendingMap.set(url, cancel);
        }
      });
  }

  /**
   * 移除请求
   */
  removePending(config?: AxiosRequestConfig) {
    if (!config) {
      return;
    }
    const url = this.getPendingUrl(config);

    if (this.pendingMap.has(url)) {
      // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
      const cancel = this.pendingMap.get(url);
      cancel && cancel();
      this.pendingMap.delete(url);
    }
  }

  /**
   * 清空所有pending
   */
  removeAllPending() {
    this.pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    this.pendingMap.clear();
  }

  /**
   * 重置
   */
  reset(): void {
    this.pendingMap = new Map<string, Canceler>();
  }

  getPendingUrl(config: AxiosRequestConfig) {
    return [
      config.method,
      config.url,
      qs.stringify(config.data),
      qs.stringify(config.params),
    ].join("&");
  }
}

export default new CancelManager();

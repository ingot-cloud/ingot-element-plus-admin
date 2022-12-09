// Ensure this file is parsed as a module regardless of dependencies.
export {};

declare module "axios" {
  interface AxiosRequestConfig {
    /**
     * 是否触发不触发公共请求失败处理器
     * 默认触发
     */
    notTriggerBizFailureHandler?: boolean;

    /**
     * 是否为刷新token后的请求重试
     */
    refreshTokenAndRetry?: boolean;

    /**
     * 公共请求，不携带token
     */
    permit?: boolean;

    /**
     * 请求头忽略传递 tenant
     */
    ignoreTenant?: boolean;
  }
}

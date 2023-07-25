/**
 * 网络配置
 */
export interface NetConfig {
  baseURL?: string;
  timeout?: number;
  timeoutErrorMessage?: string;
}

/**
 * App Store
 */
export interface AppStore {
  /**
   * 标题
   */
  title: string;
  /**
   * 版权
   */
  copyright: string;
  /**
   * 登录banner
   */
  loginBanner: string;
  /**
   * 网络配置
   */
  netConfig: NetConfig;
  /**
   * 租户ID
   */
  tenant: string;
  /**
   * basic token
   */
  basicToken: string;
}

/**
 * Tab item
 */
export interface TabItem {
  title: string;
  path: string;
  close: boolean;
}

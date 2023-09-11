/**
 * 网络配置
 */
export interface NetConfig {
  baseURL?: string;
  timeout?: number;
  timeoutErrorMessage?: string;
}

/**
 * 登录页面相关配置
 */
export interface LoginConfig {
  /**
   * 版权
   */
  copyright: string;
  /**
   * 登录banner
   */
  loginBanner: string;
  /**
   * 登录title
   */
  title: string;
  /**
   * 二维码title
   */
  qrcodeTitle: string;
  /**
   * 登录描述
   */
  desc: string;
  /**
   * 客户端ID
   */
  clientId: string;
  /**
   * 登录scope
   */
  scope: string;
  /**
   * 登录地址
   */
  loginUri: string;
  /**
   * 登录回调地址
   */
  loginCallbackUri: string;
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
   * 登录配置
   */
  login: LoginConfig;
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

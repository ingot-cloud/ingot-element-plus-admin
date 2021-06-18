/**
 * Cookie 配置
 */
export const CookieConfig = {
  Prefix: process.env.VUE_APP_STORE_PREFIX,
  Domain: process.env.VUE_APP_COOKIE_DOMAIN,
  DefaultExpireTime: 2 / 24,
  RefreshTokenDefaultExpireTime: 7 * 24 * 60 * 60,
};

/**
 * Store 配置
 */
export const StoreConfig = {
  Prefix: process.env.VUE_APP_STORE_PREFIX,
};

/**
 * 网络配置
 */
export const NetConfig = {
  BasicToken: process.env.VUE_APP_BASIC_TOKEN,
  // 超时时间，单位毫秒
  RequestTimeout: 10000,
};

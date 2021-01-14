export const CookieConfig = {
  Prefix: process.env.VUE_APP_STORE_PREFIX,
  Domain: process.env.VUE_APP_COOKIE_DOMAIN,
  DefaultExpireTime: 2 / 24
};

export const StoreConfig = {
  Prefix: process.env.VUE_APP_STORE_PREFIX
};

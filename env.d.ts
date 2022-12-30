/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_STORE_PREFIX: string;
  readonly VITE_APP_COOKIE_DOMAIN: string;
  readonly VITE_APP_COOKIE_DEFAULT_EXPIRE_TIME: number;
  readonly VITE_APP_NET_BASE_URL: string;
  readonly VITE_APP_NET_DEFAULT_TIMEOUT: number;
  readonly VITE_APP_NET_DEFAULT_TIMEOUT_MESSAGE: string;
  readonly VITE_APP_BASIC_TOKEN: string;
  readonly VITE_APP_AES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

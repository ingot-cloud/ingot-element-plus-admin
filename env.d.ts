/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_STORE_PREFIX: string;
  readonly VITE_APP_COOKIE_DOMAIN: string;
  readonly VITE_APP_COOKIE_DEFAULT_EXPIRE_TIME: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

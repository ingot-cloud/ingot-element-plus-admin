export enum StoreType {
  Local = "local",
  Session = "session"
}

export interface StoreParams {
  key: string;
  value: object;
  type?: StoreType;
}

export interface CookieParams {
  key: string;
  value: string | object;
  expires?: number; // 单位秒
  path?: string;
}

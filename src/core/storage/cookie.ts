import Cookies from "js-cookie";
import { CookieConfig } from "@/config";

export interface Cookie {
  key: string;
  value: string | object;
  expires: number; // 单位秒
  path?: string;
}

class IngotCookie {
  public set(cookie: Cookie) {
    const { key, value, expires, path } = cookie;
    const finalKey = this.keyWrapper(key);
    Cookies.set(finalKey, value, {
      expires: expires || CookieConfig.DefaultExpireTime,
      path: path || "/",
      domain: CookieConfig.Domain
    });
  }

  public get(key: string) {
    return Cookies.get(this.keyWrapper(key));
  }

  public remove(key: string, path = "/") {
    const finalKey = this.keyWrapper(key);
    Cookies.remove(finalKey, {
      path,
      domain: CookieConfig.Domain
    });
  }

  public getAll() {
    return Cookies.get();
  }

  private keyWrapper(key: string) {
    return CookieConfig.Prefix + key;
  }
}

export const CookieManager = new IngotCookie();

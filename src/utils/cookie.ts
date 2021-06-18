import Cookies from "js-cookie";
import { CookieConfig } from "@/config";
import { CookieParams } from "@/model";

class IngotCookie {
  public set(cookie: CookieParams) {
    const { key, value, expires, path } = cookie;
    const finalKey = this.keyWrapper(key);
    // 将单位转换为小时
    const finalExpires = expires
      ? expires / 60 / 60 / 24
      : CookieConfig.DefaultExpireTime;
    Cookies.set(finalKey, value, {
      expires: finalExpires,
      path: path || "/",
      domain: CookieConfig.Domain,
    });
  }

  public get(key: string) {
    return Cookies.get(this.keyWrapper(key));
  }

  public remove(key: string, path = "/") {
    const finalKey = this.keyWrapper(key);
    Cookies.remove(finalKey, {
      path,
      domain: CookieConfig.Domain,
    });
  }

  public getAll() {
    return Cookies.get();
  }

  private keyWrapper(key: string) {
    return `${CookieConfig.Prefix}:${key}`;
  }
}

export const CookieManager = new IngotCookie();

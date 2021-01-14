import { StoreConfig } from "@/config";

type StoreType = "session" | "local";

export interface StoreParams {
  key: string;
  value: object;
  type?: StoreType;
}

class IngotStore {
  /**
   * 存储
   */
  public set(params: StoreParams) {
    const { key, value, type } = params;
    const finalKey = this.keyWrapper(key);
    const obj = {
      dataType: typeof value,
      value,
      type,
      datetime: new Date().getTime()
    };
    const finalType = type || "local";
    switch (finalType) {
      case "local":
        global.localStorage.setItem(finalKey, JSON.stringify(obj));
        break;
      case "session":
        global.sessionStorage.setItem(finalKey, JSON.stringify(obj));
        break;
    }
  }

  /**
   * 获取
   */
  public get(key: string, type = "local") {
    const finalKey = this.keyWrapper(key);
    let result = null;

    switch (type) {
      case "local":
        result = global.localStorage.getItem(finalKey);
        break;
      case "session":
        result = global.sessionStorage.getItem(finalKey);
        break;
    }
    try {
      if (!result) {
        return "";
      }
      return JSON.parse(result).value;
    } catch (e) {
      return "";
    }
  }

  /**
   * 删除
   */
  public remove(key: string, type = "local") {
    const finalKey = this.keyWrapper(key);
    switch (type) {
      case "local":
        global.localStorage.removeItem(finalKey);
        break;
      case "session":
        global.sessionStorage.removeItem(finalKey);
        break;
    }
  }

  /**
   * 获取全部
   */
  public getAll(type = "local") {
    const list = [];
    let key;
    switch (type) {
      case "local":
        for (let i = 0, len = global.localStorage.length; i <= len; i++) {
          key = global.localStorage.key(i);
          if (key) {
            list.push({
              key,
              value: this.get(key, type)
            });
          }
        }
        break;
      case "session":
        for (let i = 0, len = global.sessionStorage.length; i <= len; i++) {
          key = global.sessionStorage.key(i);
          if (key) {
            list.push({
              key,
              value: this.get(key, type)
            });
          }
        }
        break;
    }

    return list;
  }

  /**
   * 清空全部
   */
  public clear(type = "local") {
    switch (type) {
      case "local":
        global.localStorage.clear();
        break;
      case "session":
        global.sessionStorage.clear();
        break;
    }
  }

  private keyWrapper(key: string) {
    return StoreConfig.Prefix + key;
  }
}

export const StoreManager = new IngotStore();

import { StoreConfig } from "@/config";
import { StoreType, StoreParams } from "@/model";

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
      datetime: new Date().getTime(),
    };
    const finalType = type || StoreType.Local;
    switch (finalType) {
      case StoreType.Local:
        global.localStorage.setItem(finalKey, JSON.stringify(obj));
        break;
      case StoreType.Session:
        global.sessionStorage.setItem(finalKey, JSON.stringify(obj));
        break;
    }
  }

  /**
   * 获取
   */
  public get(key: string, type = StoreType.Local) {
    const finalKey = this.keyWrapper(key);
    let result = null;

    switch (type) {
      case StoreType.Local:
        result = global.localStorage.getItem(finalKey);
        break;
      case StoreType.Session:
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
  public remove(key: string, type = StoreType.Local) {
    const finalKey = this.keyWrapper(key);
    switch (type) {
      case StoreType.Local:
        global.localStorage.removeItem(finalKey);
        break;
      case StoreType.Session:
        global.sessionStorage.removeItem(finalKey);
        break;
    }
  }

  /**
   * 获取全部
   */
  public getAll(type = StoreType.Local) {
    const list = [];
    let key;
    switch (type) {
      case StoreType.Local:
        for (let i = 0, len = global.localStorage.length; i <= len; i++) {
          key = global.localStorage.key(i);
          if (key) {
            list.push({
              key,
              value: this.get(key, type),
            });
          }
        }
        break;
      case StoreType.Session:
        for (let i = 0, len = global.sessionStorage.length; i <= len; i++) {
          key = global.sessionStorage.key(i);
          if (key) {
            list.push({
              key,
              value: this.get(key, type),
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
  public clear(type = StoreType.Local) {
    switch (type) {
      case StoreType.Local:
        global.localStorage.clear();
        break;
      case StoreType.Session:
        global.sessionStorage.clear();
        break;
    }
  }

  private keyWrapper(key: string) {
    return `${StoreConfig.Prefix}:${key}`;
  }
}

export const StoreManager = new IngotStore();

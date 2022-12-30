import * as CryptoJS from "crypto-js";

interface AESParams {
  data: any;
  keys: Array<string>;
  encodeKey?: string;
}

/**
 * AES 加密处理
 */
export const AES = (params: AESParams) => {
  const { data, keys } = params;
  const encodeKey = params.encodeKey || import.meta.env.VITE_APP_AES;
  const result = JSON.parse(JSON.stringify(data));

  keys.forEach((key) => {
    const value = result[key];
    const parseKey = CryptoJS.enc.Latin1.parse(encodeKey);
    const iv = parseKey;
    // 加密
    const encrypted = CryptoJS.AES.encrypt(value, parseKey, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding,
    });
    result[key] = encrypted.toString();
  });

  return result;
};

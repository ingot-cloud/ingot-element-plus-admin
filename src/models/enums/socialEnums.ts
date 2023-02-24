import { newEnumExt } from "../common";

export enum SocialTypeEnums {
  SMS = "sms",
  WECHAT = "wechat",
  MINI_PROGRAM = "miniprogram",
}
export const SocialTypeEnumsEnumExtArray = [
  newEnumExt(SocialTypeEnums.SMS, "短信登录", "success"),
  newEnumExt(SocialTypeEnums.WECHAT, "微信登录", "warning"),
  newEnumExt(SocialTypeEnums.MINI_PROGRAM, "微信小程序", "danger"),
];
export const useSocialTypeEnumsEnum = useEnum(SocialTypeEnumsEnumExtArray);

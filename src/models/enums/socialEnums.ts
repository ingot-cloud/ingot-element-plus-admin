import type { Option } from "../common";

export enum SocialTypeEnums {
  SMS = "sms",
  WECHAT = "wechat",
  MINI_PROGRAM = "miniprogram",
}

export const getSocialTypeText = (type: SocialTypeEnums): string => {
  switch (type) {
    case SocialTypeEnums.SMS:
      return "短信登录";
    case SocialTypeEnums.WECHAT:
      return "微信登录";
    case SocialTypeEnums.MINI_PROGRAM:
      return "微信小程序";
  }
};

export const SocialTypeOptions: Array<Option<string>> = [
  {
    label: getSocialTypeText(SocialTypeEnums.SMS),
    value: SocialTypeEnums.SMS,
  },
  {
    label: getSocialTypeText(SocialTypeEnums.WECHAT),
    value: SocialTypeEnums.WECHAT,
  },
  {
    label: getSocialTypeText(SocialTypeEnums.MINI_PROGRAM),
    value: SocialTypeEnums.MINI_PROGRAM,
  },
];

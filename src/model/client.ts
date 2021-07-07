import { CommonStatus, SelectItemParams } from "./common";

export enum AuthType {
  Unique = "unique",
  Standard = "standard",
}

export function getAuthTypeSelectList(): Array<SelectItemParams> {
  return [
    {
      label: "标准",
      value: AuthType.Standard,
    },
    {
      label: "唯一",
      value: AuthType.Unique,
    },
  ];
}

export enum AuthorizedGrantType {
  Password = "password",
  RefreshToken = "refresh_token",
  Client = "client_credentials",
  Code = "authorization_code",
}

export function grantTypeList(): Array<SelectItemParams> {
  return [
    {
      label: "授权码模式",
      value: AuthorizedGrantType.Code,
    },
    {
      label: "密码模式",
      value: AuthorizedGrantType.Password,
    },
    {
      label: "客户端模式",
      value: AuthorizedGrantType.Client,
    },
    {
      label: "允许刷新Token",
      value: AuthorizedGrantType.RefreshToken,
    },
  ];
}

export interface SysOauthClientDetails {
  id?: string;
  clientId?: string;
  clientSecret?: string;
  resourceId?: string;
  resourceIds?: string;
  scope?: string;
  authorizedGrantTypes?: string;
  webServerRedirectUri?: string;
  authorities?: string;
  accessTokenValidity?: number;
  refreshTokenValidity?: number;
  additionalInformation?: string;
  autoapprove?: string;
  authType?: AuthType;
  type?: string;
  status?: CommonStatus;
  remark?: string;
  createdAt?: string;
}

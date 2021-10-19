import { CommonStatus, SelectItemParams } from "./common";

export enum AuthType {
  Unique = "1",
  Standard = "0",
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

export interface OAuth2RegisteredClient {
  id?: string;
  clientId?: string;
  clientIdIssuedAt?: string;
  clientSecret?: string;
  clientName?: string;
  clientAuthenticationMethods?: string;
  authorizationGrantTypes?: string;
  redirectUris?: string;
  scopes?: string;
  requireProofKey?: string;
  requireAuthorizationConsent?: number;
  accessTokenTimeToLive?: number;
  reuseRefreshTokens?: string;
  refreshTokenTimeToLive?: string;
  idTokenSignatureAlgorithm?: AuthType;
  tokenAuthenticationMethod?: string;
  status?: CommonStatus;
}

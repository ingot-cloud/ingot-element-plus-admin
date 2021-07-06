import { CommonStatus } from "./common";

export enum AuthType {
  Unique = "unique",
  Standard = "standard",
}

export enum AuthorizedGrantType {
  Password = "password",
  RefreshToken = "refresh_token",
  Client = "client_credentials",
  Code = "authorization_code",
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

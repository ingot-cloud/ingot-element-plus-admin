export interface UserToken {
  accessToken?: string;
  tokenType?: string;
  refreshToken?: string;
  expiresIn?: number;
  scope?: string;
}

export interface User {
  username: string;
}

export interface UserInfo {
  user?: User;
  roles: Array<string>;
}

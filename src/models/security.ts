export interface UserToken {
  accessToken?: string;
  tokenType?: string;
  refreshToken?: string;
  expiresIn?: number;
  scope?: string;
}

export interface User {
  email?: string;
  phone?: string;
  nickname?: string;
  nonInitPwd?: boolean;
}

export interface UserInfo {
  user?: User;
  roles: Array<string>;
}

export interface UserPasswordDTO {
  password?: string;
  newPassword?: string;
}

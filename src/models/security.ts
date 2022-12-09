export interface UserToken {
  accessToken?: string;
  tokenType?: string;
  refreshToken?: string;
  expiresIn?: number;
  scope?: string;
}

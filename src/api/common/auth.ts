import Http from "@/net";
import type { UserToken, R } from "@/models";
import { useAppStore } from "@/stores/modules/app";
import { storeToRefs } from "pinia";

/**
 * 通过密码登录
 */
export function PasswordTokenAPI({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<R<UserToken>> {
  const data = {
    username,
    password,
    grant_type: "password",
  };
  return Http.postForm<UserToken>("/api/auth/oauth2/token", data, {
    headers: {
      Authorization: storeToRefs(useAppStore()).getBasicToken.value,
    },
  });
}

/**
 * 刷新Token
 */
export function RefreshTokenAPI(refreshToken: string): Promise<R<UserToken>> {
  const data = {
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  };
  return Http.postForm<UserToken>("/api/auth/oauth2/token", data, {
    headers: {
      Authorization: storeToRefs(useAppStore()).getBasicToken.value,
    },
    manualProcessingFailure: true,
  });
}

/**
 * 撤销Token
 */
export function RevokeTokenAPI(token: string): Promise<R> {
  return Http.delete<void>("/api/auth/token", null, {
    headers: {
      Authorization: token,
    },
  });
}

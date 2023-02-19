import Http from "@/net";
import type { UserToken, R, UserPasswordDTO } from "@/models";
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
  // application/x-www-form-urlencoded
  const data = new URLSearchParams({
    username,
    password,
    grant_type: "password",
  });
  return Http.post<UserToken>("/api/auth/oauth2/token", data, {
    headers: {
      Authorization: storeToRefs(useAppStore()).getBasicToken.value,
    },
  });
}

/**
 * 刷新Token
 */
export function RefreshTokenAPI(refreshToken: string): Promise<R<UserToken>> {
  const data = new URLSearchParams({
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });
  return Http.post<UserToken>("/api/auth/oauth2/token", data, {
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
    manualProcessingFailure: true,
  });
}

export function FixPasswordAPI(params: UserPasswordDTO): Promise<R> {
  return Http.put<void>("/api/pms/common/pwd/fix", params);
}

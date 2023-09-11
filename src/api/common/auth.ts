import Http from "@/net";
import type {
  UserToken,
  R,
  UserPasswordDTO,
  PreAuthorizeResult,
} from "@/models";
import { useAppStore } from "@/stores/modules/app";
import { storeToRefs } from "pinia";
import { AES } from "@/utils/encrypt";

// todo 使用pkce流程

/**
 * 预授权
 */
export function PreAuthorizeAPI({
  username,
  password,
  code,
}: {
  username: string;
  password: string;
  code?: string;
}): Promise<R<PreAuthorizeResult>> {
  const afterEncrypt = AES({
    data: { password },
    keys: ["password"],
  });
  const pre_grant_type = "password";
  // application/x-www-form-urlencoded
  const data = new URLSearchParams({
    username,
    password: afterEncrypt.password,
  });
  return Http.post<PreAuthorizeResult>("/api/auth/oauth2/pre_authorize", data, {
    headers: {
      Authorization: storeToRefs(useAppStore()).getBasicToken.value,
    },
    params: {
      _vc_code: code,
      pre_grant_type,
    },
  });
}

/**
 * 确认码模式
 */
export function ConfirmCodeAPI(
  code: string,
  Tenant: string
): Promise<R<UserToken>> {
  const grant_type = "pre_authorization_code";
  return Http.post<UserToken>("/api/auth/oauth2/token", null, {
    headers: {
      Tenant,
      Authorization: storeToRefs(useAppStore()).getBasicToken.value,
    },
    params: {
      code,
      grant_type,
    },
  });
}

/**
 * 通过密码登录
 */
export function PasswordTokenAPI({
  username,
  password,
  code,
}: {
  username: string;
  password: string;
  code?: string;
}): Promise<R<UserToken>> {
  const afterEncrypt = AES({
    data: { password },
    keys: ["password"],
  });
  const grant_type = "password";
  // application/x-www-form-urlencoded
  const data = new URLSearchParams({
    username,
    password: afterEncrypt.password,
  });
  return Http.post<UserToken>("/api/auth/oauth2/token", data, {
    headers: {
      Authorization: storeToRefs(useAppStore()).getBasicToken.value,
    },
    params: {
      _vc_code: code,
      grant_type,
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

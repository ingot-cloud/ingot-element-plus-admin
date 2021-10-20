import request from "@/net";
import Qs from "qs";
import { UserToken, IngotResponse } from "@/model";
import { getLoginTenant } from "@/store/composition/auth";

const BasicToken = "Basic aW5nb3Q6aW5nb3Q=";

/**
 * 刷新Token
 * @param refreshToken
 */
export function refreshToken(
  refreshToken: string
): Promise<IngotResponse<UserToken>> {
  const data = Qs.stringify({
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });
  return request.post<UserToken>({
    url: "/api/auth/oauth2/token",
    params: data,
    config: {
      headers: {
        Tenant: getLoginTenant(),
        Authorization: BasicToken,
      },
      notTriggerBizFailureHandler: true,
    },
  });
}

/**
 * 通过密码登录
 * @param param0
 */
export function login({
  username,
  password,
  tenant,
}: {
  username: string;
  password: string;
  tenant: string;
}): Promise<IngotResponse<UserToken>> {
  const data = Qs.stringify({
    username,
    password,
    grant_type: "password",
  });
  return request.post<UserToken>({
    url: "/api/auth/oauth2/token",
    params: data,
    config: {
      headers: {
        Tenant: tenant,
        Authorization: BasicToken,
      },
    },
  });
}

/**
 * 撤销Token
 */
export function revoke(): Promise<IngotResponse<void>> {
  return request.delete<void>({
    url: "/api/auth/token",
  });
}

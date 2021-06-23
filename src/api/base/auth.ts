import request from "@/net";
import Qs from "qs";
import { UserToken, IngotResponse } from "@/model";
import { getLoginTenant } from "@/store/composition/auth";

const BasicToken = "Basic d2ViLWNsb3VkOndlYi1jbG91ZA==";

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
    scope: "web",
  });
  return request.post<UserToken>({
    url: "/api/acs/oauth/token",
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
    scope: "web",
  });
  return request.post<UserToken>({
    url: "/api/acs/oauth/token",
    params: data,
    config: {
      headers: {
        Tenant: tenant,
        Authorization: BasicToken,
      },
    },
  });
}

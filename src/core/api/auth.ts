import request from "@/core/net";
import Qs from "qs";

const BasicToken = "Basic d2ViLWNsb3VkOndlYi1jbG91ZA==";

/**
 * 通过密码登录
 * @param param0
 */
export function login({
  username,
  password
}: {
  username: string;
  password: string;
}) {
  const data = Qs.stringify({
    username,
    password,
    // eslint-disable-next-line @typescript-eslint/camelcase
    grant_type: "password",
    scope: "web"
  });
  return request.post("/api/acs/oauth/token", data, {
    headers: {
      Tenant: "1",
      Authorization: BasicToken
    }
  });
}

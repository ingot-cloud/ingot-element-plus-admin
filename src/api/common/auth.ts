import Http from "@/net";
import type { UserToken, R } from "@/models";

const BasicToken = "Basic aW5nb3Q6aW5nb3Q=";

/**
 * 通过密码登录
 */
export function LoginAPI({
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
      Authorization: BasicToken,
    },
  });
}

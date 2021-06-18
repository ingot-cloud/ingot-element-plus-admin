import request from "@/net";
import { UserInfo, IngotResponse } from "@/model";

/**
 * 获取用户信息
 */
export function getUserInfo(): Promise<IngotResponse<UserInfo>> {
  return request.get<UserInfo>({
    url: "/api/pms/v1/user",
  });
}

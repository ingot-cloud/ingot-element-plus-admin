import request from "@/core/net";
import { UserInfo } from "../model";

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return request.get<UserInfo>("/api/pms/v1/user");
}

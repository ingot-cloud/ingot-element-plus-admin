import request from "@/net";
import type {
  SysUser,
  Page,
  AllOrgUserFilterDTO,
  UserDTO,
  UserProfileVO,
  R,
} from "@/models";
import { filterParams } from "@/utils/object";

/**
 * 用户分页信息
 */
export function UserPageAPI(
  page: Page,
  condition?: AllOrgUserFilterDTO
): Promise<R<Page<SysUser>>> {
  if (condition) {
    filterParams(condition);
  }
  return request.get<Page<SysUser>>("/api/pms/v1/admin/user/page", {
    ...page,
    ...condition,
  });
}

/**
 * 用户简介信息
 * @param id 用户ID
 */
export function UserProfileAPI(id: string): Promise<R<UserProfileVO>> {
  return request.get<UserProfileVO>(`/api/pms/v1/admin/user/profile/${id}`);
}

/**
 * 创建用户
 * @param params 参数
 */
export function CreateUserAPI(params: UserDTO): Promise<R<void>> {
  filterParams(params);
  return request.post<void>("/api/pms/v1/admin/user", params);
}

/**
 * 更新用户信息
 * @param params 参数
 */
export function UpdateUserAPI(params: UserDTO): Promise<R<void>> {
  filterParams(params);
  return request.put<void>("/api/pms/v1/admin/user", params);
}

/**
 * 删除用户
 */
export function RemoveUserAPI(id: string): Promise<R<void>> {
  return request.delete<void>(`/api/pms/v1/admin/user/${id}`);
}

import request from "@/net";
import type {
  UserPageItemVO,
  Page,
  UserDTO,
  UserQueryDTO,
  OrgUserProfileVO,
  R,
  UserPasswordDTO,
} from "@/models";
import { filterParams } from "@/utils/object";
import { AES } from "@/utils/encrypt";

/**
 * 初始化密码
 */
export function InitPwdAPI(params: UserPasswordDTO): Promise<R<Page<UserPageItemVO>>> {
  const afterEncrypt = AES({
    data: params,
    keys: ["password", "newPassword"],
  });
  return request.put<Page<UserPageItemVO>>("/api/pms/v1/org/user/initFixPwd", afterEncrypt);
}

/**
 * 修改密码
 */
export function FixPasswordAPI(params: UserPasswordDTO): Promise<R> {
  const afterEncrypt = AES({
    data: params,
    keys: ["password", "newPassword"],
  });
  return request.put<void>("/api/pms/v1/org/user/fixPwd", afterEncrypt);
}

/**
 * 用户分页信息
 */
export function UserPageAPI(
  page: Page,
  condition?: UserQueryDTO,
): Promise<R<Page<UserPageItemVO>>> {
  if (condition) {
    filterParams(condition);
  }
  return request.get<Page<UserPageItemVO>>("/api/pms/v1/org/user/page", {
    ...page,
    ...condition,
  });
}

/**
 * 用户简介信息
 * @param id 用户ID
 */
export function UserProfileAPI(id: string): Promise<R<OrgUserProfileVO>> {
  return request.get<OrgUserProfileVO>(`/api/pms/v1/org/user/profile/${id}`);
}

/**
 * 创建用户
 * @param params 参数
 */
export function CreateUserAPI(params: UserDTO): Promise<R<void>> {
  filterParams(params);
  return request.post<void>("/api/pms/v1/org/user", params);
}

/**
 * 更新用户信息
 * @param params 参数
 */
export function UpdateUserAPI(params: UserDTO): Promise<R<void>> {
  filterParams(params);
  return request.put<void>("/api/pms/v1/org/user", params);
}

/**
 * 删除用户
 */
export function RemoveUserAPI(id: string): Promise<R<void>> {
  return request.delete<void>(`/api/pms/v1/org/user/${id}`);
}

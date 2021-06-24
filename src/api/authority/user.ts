import request from "@/net";
import { UserPageItemVo, Page, UserDto, IngotResponse } from "@/model";
import { filterParams } from "@/utils/object";

/**
 * 用户分页信息
 */
export function userPage(
  page: Page,
  condition?: UserDto
): Promise<IngotResponse<Page<UserPageItemVo>>> {
  if (condition) {
    filterParams(condition);
  }
  return request.get<Page<UserPageItemVo>>({
    url: "/api/pms/v1/user/page",
    params: {
      ...page,
      ...condition,
    },
  });
}

/**
 * 创建用户
 * @param params 参数
 */
export function create(params: UserDto): Promise<IngotResponse<void>> {
  filterParams(params);
  return request.post<void>({
    url: "/api/pms/v1/user",
    params,
  });
}

/**
 * 更新用户信息
 * @param params 参数
 */
export function update(params: UserDto): Promise<IngotResponse<void>> {
  filterParams(params);
  return request.put<void>({
    url: "/api/pms/v1/user",
    params,
  });
}

/**
 * 删除用户
 */
export function remove(id: string): Promise<IngotResponse<void>> {
  return request.delete<void>({
    url: `/api/pms/v1/user/${id}`,
  });
}

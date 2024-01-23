import request from "@/net";
import type { AppUser, Page, R } from "@/models";
import { filterParams } from "@/utils/object";

/**
 * 用户分页信息
 */
export function UserPageAPI(
  page: Page,
  condition?: AppUser
): Promise<R<Page<AppUser>>> {
  if (condition) {
    filterParams(condition);
  }
  return request.get<Page<AppUser>>("/api/pms/v1/admin/appUser/page", {
    ...page,
    ...condition,
  });
}

/**
 * 更新用户信息
 * @param params 参数
 */
export function UpdateUserAPI(params: AppUser): Promise<R<void>> {
  filterParams(params);
  return request.put<void>("/api/pms/v1/admin/appUser", params);
}

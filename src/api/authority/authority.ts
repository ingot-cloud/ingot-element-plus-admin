import request from "@/net";
import { IngotResponse, Page, SysAuthority } from "@/model";
import { filterParams } from "@/utils/object";

/**
 * 获取权限分页信息
 * @returns
 */
export function page(
  page: Page,
  condition?: SysAuthority
): Promise<IngotResponse<Page<SysAuthority>>> {
  if (condition) {
    filterParams(condition);
  }
  return request.get<Page<SysAuthority>>({
    url: "/api/pms/v1/authority/page",
    params: {
      ...page,
      ...condition,
    },
  });
}

/**
 * 创建权限
 * @param params 参数
 * @returns
 */
export function create(params: SysAuthority): Promise<IngotResponse<void>> {
  filterParams(params);
  return request.post<void>({
    url: "/api/pms/v1/authority",
    params,
  });
}

/**
 * 更新权限
 * @param params 参数
 * @returns
 */
export function update(params: SysAuthority): Promise<IngotResponse<void>> {
  filterParams(params);
  return request.put<void>({
    url: "/api/pms/v1/authority",
    params,
  });
}

/**
 * 删除权限
 * @param id id
 * @returns
 */
export function remove(id: string): Promise<IngotResponse<void>> {
  return request.delete<void>({
    url: `/api/pms/v1/authority/${id}`,
  });
}

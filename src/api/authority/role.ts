import request from "@/net";
import { RolePageItemVo, SysRole, Page, IngotResponse } from "@/model";
import { filterParams } from "@/utils/object";

export function rolePage(
  page: Page,
  condition?: SysRole
): Promise<IngotResponse<Page<RolePageItemVo>>> {
  if (condition) {
    filterParams(condition);
  }
  return request.get<Page<RolePageItemVo>>({
    url: "/api/pms/v1/role/page",
    params: {
      ...page,
      ...condition,
    },
  });
}

export function create(params: SysRole): Promise<IngotResponse<void>> {
  filterParams(params);
  return request.post<void>({
    url: "/api/pms/v1/role",
    params,
  });
}

export function update(params: SysRole): Promise<IngotResponse<void>> {
  filterParams(params);
  return request.put<void>({
    url: "/api/pms/v1/role",
    params,
  });
}

export function remove(id: string): Promise<IngotResponse<void>> {
  return request.delete<void>({
    url: `/api/pms/v1/role/${id}`,
  });
}

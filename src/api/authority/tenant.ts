import request from "@/net";
import { SysTenant, Page, IngotResponse } from "@/model";
import { filterParams } from "@/utils/object";

/**
 * 租户分页信息
 */
export function tenantPage(
  page: Page,
  condition?: SysTenant
): Promise<IngotResponse<Page<SysTenant>>> {
  if (condition) {
    filterParams(condition);
  }
  return request.get<Page<SysTenant>>({
    url: "/api/pms/v1/tenant/page",
    params: {
      ...page,
      ...condition,
    },
  });
}

export function create(params: SysTenant): Promise<IngotResponse<void>> {
  filterParams(params);
  return request.post<void>({
    url: "/api/pms/v1/tenant",
    params,
  });
}

export function update(params: SysTenant): Promise<IngotResponse<void>> {
  filterParams(params);
  return request.put<void>({
    url: "/api/pms/v1/tenant",
    params,
  });
}

export function remove(id: string): Promise<IngotResponse<void>> {
  return request.delete<void>({
    url: `/api/pms/v1/tenant/${id}`,
  });
}

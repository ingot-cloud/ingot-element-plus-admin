import Http from "@/net";
import type { SysTenant, Option, Page, R } from "@/models";
import { filterParams } from "@/utils/object";

/**
 * 列表
 */
export function TenantOptionsAPI(): Promise<R<Array<Option>>> {
  return Http.get<Array<Option>>("/api/pms/v1/tenant/options", null, {
    permit: true,
  });
}

/**
 * 租户分页信息
 */
export function TenantPageAPI(
  page: Page,
  condition?: SysTenant
): Promise<R<Page<SysTenant>>> {
  if (condition) {
    filterParams(condition);
  }
  return Http.get<Page<SysTenant>>("/api/pms/v1/tenant/page", {
    ...page,
    ...condition,
  });
}

export function TenantCreateAPI(params: SysTenant): Promise<R<void>> {
  filterParams(params);
  return Http.post<void>("/api/pms/v1/tenant", params);
}

export function TenantUpdateAPI(params: SysTenant): Promise<R<void>> {
  filterParams(params);
  return Http.put<void>("/api/pms/v1/tenant", params);
}

export function TenantRemoveAPI(id: string): Promise<R<void>> {
  return Http.delete<void>(`/api/pms/v1/tenant/${id}`);
}

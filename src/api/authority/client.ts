import request from "@/net";
import { IngotResponse, Page, SysOauthClientDetails } from "@/model";
import { filterParams } from "@/utils/object";

/**
 * 获取分页信息
 * @returns
 */
export function page(
  page: Page,
  condition?: SysOauthClientDetails
): Promise<IngotResponse<Page<SysOauthClientDetails>>> {
  if (condition) {
    filterParams(condition);
  }
  return request.get<Page<SysOauthClientDetails>>({
    url: "/api/pms/v1/client/page",
    params: {
      ...page,
      ...condition,
    },
  });
}

/**
 * 获取客户端信息
 * @param id ID
 * @returns
 */
export function getOne(
  id: string
): Promise<IngotResponse<SysOauthClientDetails>> {
  return request.get<SysOauthClientDetails>({
    url: `/api/pms/v1/client/${id}`,
  });
}

/**
 * 创建客户端
 * @param params 参数
 * @returns
 */
export function create(
  params: SysOauthClientDetails
): Promise<IngotResponse<void>> {
  filterParams(params);
  return request.post<void>({
    url: "/api/pms/v1/client",
    params,
  });
}

/**
 * 更新客户端信息
 * @param params 参数
 * @returns
 */
export function update(
  params: SysOauthClientDetails
): Promise<IngotResponse<void>> {
  filterParams(params);
  return request.put<void>({
    url: "/api/pms/v1/client",
    params,
  });
}

/**
 * 删除客户端
 * @param clientId clientId
 * @returns
 */
export function remove(clientId: string): Promise<IngotResponse<void>> {
  return request.delete<void>({
    url: `/api/pms/v1/client/${clientId}`,
  });
}

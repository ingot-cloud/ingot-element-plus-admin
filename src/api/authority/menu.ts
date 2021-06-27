import request from "@/net";
import { IngotResponse, MenuTreeNode, SysMenu } from "@/model";
import { filterParams } from "@/utils/object";

/**
 * 获取Menu tree
 * @returns
 */
export function getMenuTree(): Promise<IngotResponse<Array<MenuTreeNode>>> {
  return request.get<Array<MenuTreeNode>>({
    url: "/api/pms/v1/menu/tree",
  });
}

/**
 * 创建菜单
 * @param params 参数
 * @returns
 */
export function create(params: SysMenu): Promise<IngotResponse<void>> {
  filterParams(params);
  return request.post<void>({
    url: "/api/pms/v1/menu",
    params,
  });
}

/**
 * 更新菜单
 * @param params 参数
 * @returns
 */
export function update(params: SysMenu): Promise<IngotResponse<void>> {
  filterParams(params);
  return request.put<void>({
    url: "/api/pms/v1/menu",
    params,
  });
}

/**
 * 删除菜单
 * @param id id
 * @returns
 */
export function remove(id: string): Promise<IngotResponse<void>> {
  return request.delete<void>({
    url: `/api/pms/v1/menu/${id}`,
  });
}

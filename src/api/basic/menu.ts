import request from "@/net";
import type { R, MenuTreeNode, SysMenu } from "@/models";
import { filterParams } from "@/utils/object";

/**
 * 获取用户菜单API
 * @returns
 */
export function GetUserMenuAPI(): Promise<R<Array<MenuTreeNode>>> {
  return request.get<Array<MenuTreeNode>>("/api/pms/v1/menu/userMenu");
}

/**
 * 获取Menu tree
 * @returns
 */
export function GetMenuTreeAPI(): Promise<R<Array<MenuTreeNode>>> {
  return request.get<Array<MenuTreeNode>>("/api/pms/v1/menu/tree");
}

/**
 * 创建菜单
 * @param params 参数
 * @returns
 */
export function CreateMenuAPI(params: SysMenu): Promise<R<void>> {
  filterParams(params);
  return request.post<void>("/api/pms/v1/menu", params);
}

/**
 * 更新菜单
 * @param params 参数
 * @returns
 */
export function UpdateMenuAPI(params: SysMenu): Promise<R<void>> {
  filterParams(params);
  return request.put<void>("/api/pms/v1/menu", params);
}

/**
 * 删除菜单
 * @param id id
 * @returns
 */
export function RemoveMenuAPI(id: string): Promise<R<void>> {
  return request.delete<void>(`/api/pms/v1/menu/${id}`);
}

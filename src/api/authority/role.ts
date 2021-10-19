import request from "@/net";
import {
  RolePageItemVo,
  SysRole,
  SysUser,
  Page,
  IngotResponse,
  RoleBindParams,
  SysAuthority,
  SysDept,
  SysMenu,
  OAuth2RegisteredClient,
  DeptTreeNode,
  MenuTreeNode,
  AuthorityTreeNode,
} from "@/model";
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

export function bindAuthority(
  params: RoleBindParams
): Promise<IngotResponse<void>> {
  return request.put<void>({
    url: "/api/pms/v1/role/bindAuthority",
    params,
  });
}

export function getBindAuthorities(
  id: string,
  isBind: boolean,
  condition?: SysAuthority
): Promise<IngotResponse<Array<AuthorityTreeNode>>> {
  if (condition) {
    filterParams(condition);
  }
  return request.get<Array<AuthorityTreeNode>>({
    url: `/api/pms/v1/role/bindAuthority/${id}`,
    params: {
      isBind,
      ...condition,
    },
  });
}

export function bindDept(params: RoleBindParams): Promise<IngotResponse<void>> {
  return request.put<void>({
    url: "/api/pms/v1/role/bindDept",
    params,
  });
}

export function getBindDepts(
  id: string,
  isBind: boolean,
  condition?: SysDept
): Promise<IngotResponse<Array<DeptTreeNode>>> {
  if (condition) {
    filterParams(condition);
  }
  return request.get<Array<DeptTreeNode>>({
    url: `/api/pms/v1/role/bindDept/${id}`,
    params: {
      isBind,
      ...condition,
    },
  });
}

export function bindMenu(params: RoleBindParams): Promise<IngotResponse<void>> {
  return request.put<void>({
    url: "/api/pms/v1/role/bindMenu",
    params,
  });
}

export function getBindMenus(
  id: string,
  isBind: boolean,
  condition?: SysMenu
): Promise<IngotResponse<Array<MenuTreeNode>>> {
  if (condition) {
    filterParams(condition);
  }
  return request.get<Array<MenuTreeNode>>({
    url: `/api/pms/v1/role/bindMenu/${id}`,
    params: {
      isBind,
      ...condition,
    },
  });
}

export function bindClient(
  params: RoleBindParams
): Promise<IngotResponse<void>> {
  return request.put<void>({
    url: "/api/pms/v1/role/bindClient",
    params,
  });
}

export function getBindClients(
  page: Page,
  id: string,
  isBind: boolean,
  condition?: OAuth2RegisteredClient
): Promise<IngotResponse<Page<OAuth2RegisteredClient>>> {
  if (condition) {
    filterParams(condition);
  }
  return request.get<Page<OAuth2RegisteredClient>>({
    url: `/api/pms/v1/role/bindClient/${id}`,
    params: {
      ...page,
      isBind,
      ...condition,
    },
  });
}

export function bindUser(params: RoleBindParams): Promise<IngotResponse<void>> {
  return request.put<void>({
    url: "/api/pms/v1/role/bindUser",
    params,
  });
}

export function getBindUsers(
  page: Page,
  id: string,
  isBind: boolean,
  condition?: SysUser
): Promise<IngotResponse<Page<SysUser>>> {
  if (condition) {
    filterParams(condition);
  }
  return request.get<Page<SysUser>>({
    url: `/api/pms/v1/role/bindUser/${id}`,
    params: {
      ...page,
      isBind,
      ...condition,
    },
  });
}

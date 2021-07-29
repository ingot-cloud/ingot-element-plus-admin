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
  SysOauthClientDetails,
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
  page: Page,
  id: string,
  isBind: boolean
): Promise<IngotResponse<Page<SysAuthority>>> {
  return request.get<Page<SysAuthority>>({
    url: `/api/pms/v1/role/bindAuthority/${id}`,
    params: {
      ...page,
      isBind,
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
  page: Page,
  id: string,
  isBind: boolean
): Promise<IngotResponse<Page<SysDept>>> {
  return request.get<Page<SysDept>>({
    url: `/api/pms/v1/role/bindDept/${id}`,
    params: {
      ...page,
      isBind,
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
  page: Page,
  id: string,
  isBind: boolean
): Promise<IngotResponse<Page<SysMenu>>> {
  return request.get<Page<SysMenu>>({
    url: `/api/pms/v1/role/bindMenu/${id}`,
    params: {
      ...page,
      isBind,
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
  isBind: boolean
): Promise<IngotResponse<Page<SysOauthClientDetails>>> {
  return request.get<Page<SysOauthClientDetails>>({
    url: `/api/pms/v1/role/bindClient/${id}`,
    params: {
      ...page,
      isBind,
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
  isBind: boolean
): Promise<IngotResponse<Page<SysUser>>> {
  return request.get<Page<SysUser>>({
    url: `/api/pms/v1/role/bindUser/${id}`,
    params: {
      ...page,
      isBind,
    },
  });
}

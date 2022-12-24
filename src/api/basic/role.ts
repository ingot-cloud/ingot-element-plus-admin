import request from "@/net";
import type {
  RolePageItemVO,
  SysRole,
  SysUser,
  Page,
  R,
  RoleBindParams,
  SysAuthority,
  SysDept,
  OAuth2RegisteredClient,
  DeptTreeNode,
  AuthorityTreeNode,
  Option,
} from "@/models";
import { filterParams } from "@/utils/object";

export function RoleOptionsAPI() {
  return request.get<Array<Option<string>>>("/api/pms/v1/role/options");
}

export function RolePageAPI(
  page: Page,
  condition?: SysRole
): Promise<R<Page<RolePageItemVO>>> {
  if (condition) {
    filterParams(condition);
  }
  return request.get<Page<RolePageItemVO>>("/api/pms/v1/role/page", {
    ...page,
    ...condition,
  });
}

export function CreateRoleAPI(params: SysRole): Promise<R<void>> {
  filterParams(params);
  return request.post<void>("/api/pms/v1/role", params);
}

export function UpdateRoleAPI(params: SysRole): Promise<R<void>> {
  filterParams(params);
  return request.put<void>("/api/pms/v1/role", params);
}

export function RemoveRoleAPI(id: string): Promise<R<void>> {
  return request.delete<void>(`/api/pms/v1/role/${id}`);
}

export function BindAuthorityAPI(params: RoleBindParams): Promise<R<void>> {
  return request.put<void>("/api/pms/v1/role/bindAuthority", params);
}

export function GetBindAuthoritiesAPI(
  id: string,
  isBind: boolean,
  condition?: SysAuthority
): Promise<R<Array<AuthorityTreeNode>>> {
  if (condition) {
    filterParams(condition);
  }
  return request.get<Array<AuthorityTreeNode>>(
    `/api/pms/v1/role/bindAuthority/${id}`,
    {
      isBind,
      ...condition,
    }
  );
}

export function BindDeptAPI(params: RoleBindParams): Promise<R<void>> {
  return request.put<void>("/api/pms/v1/role/bindDept", params);
}

export function GetBindDeptsAPI(
  id: string,
  isBind: boolean,
  condition?: SysDept
): Promise<R<Array<DeptTreeNode>>> {
  if (condition) {
    filterParams(condition);
  }
  return request.get<Array<DeptTreeNode>>(`/api/pms/v1/role/bindDept/${id}`, {
    isBind,
    ...condition,
  });
}

export function BindClientAPI(params: RoleBindParams): Promise<R<void>> {
  return request.put<void>("/api/pms/v1/role/bindClient", params);
}

export function GetBindClientsAPI(
  id: string,
  isBind: boolean,
  condition?: OAuth2RegisteredClient
): Promise<R<Array<OAuth2RegisteredClient>>> {
  if (condition) {
    filterParams(condition);
  }
  return request.get<Array<OAuth2RegisteredClient>>(
    `/api/pms/v1/role/bindClient/${id}`,
    {
      isBind,
      ...condition,
    }
  );
}

export function BindUserAPI(params: RoleBindParams): Promise<R<void>> {
  return request.put<void>("/api/pms/v1/role/bindUser", params);
}

export function GetBindUsersAPI(
  page: Page,
  id: string,
  isBind: boolean,
  condition?: SysUser
): Promise<R<Page<SysUser>>> {
  if (condition) {
    filterParams(condition);
  }
  return request.get<Page<SysUser>>(`/api/pms/v1/role/bindUser/${id}`, {
    ...page,
    isBind,
    ...condition,
  });
}

import request from "@/net";
import type {
  RolePageItemVO,
  SysRole,
  SysUser,
  Page,
  R,
  RoleBindParams,
  SysAuthority,
  AuthorityTreeNode,
  Option,
} from "@/models";
import { filterParams } from "@/utils/object";

export function RoleOptionsAPI() {
  return request.get<Array<Option<string>>>("/api/pms/v1/admin/role/options");
}

export function RoleListAPI(
  condition?: SysRole
): Promise<R<Array<RolePageItemVO>>> {
  if (condition) {
    filterParams(condition);
  }
  return request.get<Array<RolePageItemVO>>("/api/pms/v1/admin/role/list", {
    ...condition,
  });
}

export function RolePageAPI(
  page: Page,
  condition?: SysRole
): Promise<R<Page<RolePageItemVO>>> {
  if (condition) {
    filterParams(condition);
  }
  return request.get<Page<RolePageItemVO>>("/api/pms/v1/admin/role/page", {
    ...page,
    ...condition,
  });
}

export function CreateRoleAPI(params: SysRole): Promise<R<void>> {
  filterParams(params);
  return request.post<void>("/api/pms/v1/admin/role", params);
}

export function UpdateRoleAPI(params: SysRole): Promise<R<void>> {
  filterParams(params);
  return request.put<void>("/api/pms/v1/admin/role", params);
}

export function RemoveRoleAPI(id: string): Promise<R<void>> {
  return request.delete<void>(`/api/pms/v1/admin/role/${id}`);
}

export function BindAuthorityAPI(params: RoleBindParams): Promise<R<void>> {
  return request.put<void>("/api/pms/v1/admin/role/bindAuthority", params);
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
    `/api/pms/v1/admin/role/bindAuthority/${id}`,
    {
      isBind,
      ...condition,
    }
  );
}

export function BindUserAPI(params: RoleBindParams): Promise<R<void>> {
  return request.put<void>("/api/pms/v1/admin/role/bindUser", params);
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
  return request.get<Page<SysUser>>(`/api/pms/v1/admin/role/bindUser/${id}`, {
    ...page,
    isBind,
    ...condition,
  });
}

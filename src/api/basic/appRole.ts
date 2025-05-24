import request from "@/net";
import type {
  RolePageItemVO,
  AppRoleGroup,
  RoleGroupItemVO,
  AppRole,
  RoleFilterDTO,
  R,
  Option,
} from "@/models";
import { filterParams } from "@/utils/object";

export function RoleOrgOptionsAPI(orgId: string) {
  return request.get<Array<Option<string>>>(`/api/pms/v1/admin/appRole/options/${orgId}`);
}

export function RoleGroupListAPI(filter?: RoleFilterDTO): Promise<R<Array<RoleGroupItemVO>>> {
  if (filter) {
    filterParams(filter);
  }
  return request.get<Array<RoleGroupItemVO>>("/api/pms/v1/admin/appRole/group/list", {
    ...filter,
  });
}

export function RoleListAPI(condition?: AppRole): Promise<R<Array<RolePageItemVO>>> {
  if (condition) {
    filterParams(condition);
  }
  return request.get<Array<RolePageItemVO>>("/api/pms/v1/admin/appRole/list", {
    ...condition,
  });
}

export function CreateRoleAPI(params: AppRole): Promise<R<void>> {
  filterParams(params);
  return request.post<void>("/api/pms/v1/admin/appRole", params);
}

export function UpdateRoleAPI(params: AppRole): Promise<R<void>> {
  filterParams(params);
  return request.put<void>("/api/pms/v1/admin/appRole", params);
}

export function RemoveRoleAPI(id: string): Promise<R<void>> {
  return request.delete<void>(`/api/pms/v1/admin/appRole/${id}`);
}

export function CreateRoleGroupAPI(params: AppRoleGroup): Promise<R<void>> {
  filterParams(params);
  return request.post<void>("/api/pms/v1/admin/appRole/group", params);
}

export function UpdateRoleGroupAPI(params: AppRoleGroup): Promise<R<void>> {
  filterParams(params);
  return request.put<void>("/api/pms/v1/admin/appRole/group", params);
}

export function RemoveRoleGroupAPI(id: string): Promise<R<void>> {
  return request.delete<void>(`/api/pms/v1/admin/appRole/group/${id}`);
}

export function GroupSortAPI(ids: Array<string>): Promise<R<void>> {
  return request.put<void>("/api/pms/v1/admin/appRole/group/sort", {
    ids,
  });
}

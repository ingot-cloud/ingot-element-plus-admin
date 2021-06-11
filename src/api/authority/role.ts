import request from "@/net";
import { RolePageItemVo, SysRole, Page } from "@/model";

export function rolePage(page: Page, condition?: SysRole) {
  return request.get<Page<RolePageItemVo>>({
    url: "/api/pms/v1/role/page",
    params: {
      ...page,
      ...condition
    }
  });
}

export function create(params: SysRole) {
  return request.post<void>({
    url: "/api/pms/v1/role",
    params
  });
}

export function update(params: SysRole) {
  return request.put<void>({
    url: "/api/pms/v1/role",
    params
  });
}

export function remove(id: string) {
  return request.delete<void>({
    url: `/api/pms/v1/role/${id}`
  });
}

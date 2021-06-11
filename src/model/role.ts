import { CommonStatus } from "./common";

export interface RolePageItemVo {
  id: string;
  name: string;
  code: string;
  type: string;
  status: CommonStatus;
  createdAt: string;
}

export interface SysRole {
  id?: string;
  name?: string;
  code?: string;
  type?: string;
  status?: CommonStatus;
  remark?: string;
}

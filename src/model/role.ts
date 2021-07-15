import { CommonStatus } from "./common";

export interface RolePageItemVo {
  id: string;
  name: string;
  code: string;
  type: string;
  status: CommonStatus;
  remark: string;
  createdAt: string;
  canAction: boolean;
}

export interface SysRole {
  id?: string;
  name?: string;
  code?: string;
  type?: string;
  status?: CommonStatus;
  remark?: string;
}

export interface RoleBindParams {
  id?: string;
  removeIds?: Array<string>;
  bindIds?: Array<string>;
}

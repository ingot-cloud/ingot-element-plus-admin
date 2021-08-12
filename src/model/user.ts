import { CommonStatus, OptionIDEntity } from "./common";

/**
 * UserPageItemVo
 * 分页vo
 */
export interface UserPageItemVo {
  userId: string;
  tenantName: string;
  deptName: string;
  username: string;
  realName?: string;
  phone?: string;
  email?: string;
  status?: CommonStatus;
  createdAt: string;
}

export interface SysUser extends OptionIDEntity {
  id?: string;
  deptId?: string;
  username?: string;
  realName?: string;
  phone?: string;
  email?: string;
  status?: CommonStatus;
}

export interface UserDto extends SysUser {
  roleIds?: Array<string>;
  clientIds?: Array<string>;
  newPassword?: string;
}

export interface UserProfileVo {
  deptId: string;
  roleIds?: Array<string>;
  username: string;
  realName?: string;
  phone?: string;
  email?: string;
  status?: CommonStatus;
  createdAt: string;
}

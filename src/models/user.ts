import type { OptionIDEntity } from "./common";
import type { CommonStatus } from "./enums";

/**
 * UserPageItemVO
 * 分页vo
 */
export interface UserPageItemVO {
  userId: string;
  username: string;
  nickname?: string;
  phone?: string;
  email?: string;
  status?: CommonStatus;
  createdAt: string;
}

export interface SysUser extends OptionIDEntity {
  id?: string;
  username?: string;
  nickname?: string;
  phone?: string;
  email?: string;
  avatar?: string;
  status?: CommonStatus;
}

export interface UserDTO extends SysUser {
  roleId?: string;
  deptId?: string;
  newPassword?: string;
}

export interface UserProfileVO {
  deptIds: Array<string>;
  roleIds?: Array<string>;
  username: string;
  nickname?: string;
  phone?: string;
  email?: string;
  status?: CommonStatus;
  createdAt: string;
}

export interface UserPasswordDTO {
  password?: string;
  newPassword?: string;
}

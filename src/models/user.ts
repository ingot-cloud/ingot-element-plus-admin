import type { OptionIDEntity } from "./common";
import type { CommonStatus } from "./enums";
import type { SysUserTenant } from "./tenant";

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

export interface AllOrgUserFilterDTO {
  nickname?: string;
  phone?: string;
  email?: string;
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

export interface UserDTO {
  id?: string;
  phone?: string;
  nickname?: string;
  email?: string;
  avatar?: string;
  status?: CommonStatus;
}

export interface UserProfileVO {
  orgList?: Array<SysUserTenant>;
  username: string;
  nickname?: string;
  phone?: string;
  email?: string;
  status?: CommonStatus;
  createdAt: string;
}

export interface OrgUserProfileVO {
  deptIds: Array<string>;
  roleIds?: Array<string>;
  username: string;
  nickname?: string;
  phone?: string;
  email?: string;
  status?: CommonStatus;
  createdAt: string;
}

export interface ResetPwdVO {
  random?: string;
}

export interface UserOrgEditDTO {
  id?: string;
  orgId?: string;
  deptIds?: Array<string>;
  roleIds?: Array<string>;
}

export interface UserOrgInfoVO {
  orgId?: string;
  deptIds?: Array<string>;
  roleIds?: Array<string>;
}

export interface UserQueryDTO extends SysUser {
  roleId?: string;
  deptId?: string;
}

export interface AppUser {
  id?: string;
  username?: string;
  nickname?: string;
  phone?: string;
  email?: string;
  avatar?: string;
  status?: CommonStatus;
}

export interface AppUserCreateDTO {
  nickname?: string;
  phone?: string;
  avatar?: string;
}

export interface SimpleUserVO {
  id?: string;
  nickname?: string;
  avatar?: string;
}

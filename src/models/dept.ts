import type { CommonStatus, DeptRoleScope } from "./enums";

/**
 * 部门树节点
 */
export interface DeptTreeNode {
  // 部门名称
  name?: string;
  scope?: DeptRoleScope;
  sort?: number;
  status?: CommonStatus;
  id?: string;
  pid?: string;
  children?: Array<DeptTreeNode>;
}

/**
 * 部门模型
 */
export interface SysDept {
  id?: string;
  pid?: string;
  name?: string;
  scope?: DeptRoleScope;
  sort?: number;
  status?: CommonStatus;
}

export const RootDept: DeptTreeNode = {
  id: "0",
  name: "根部门",
};

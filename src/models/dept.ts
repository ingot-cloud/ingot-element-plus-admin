import type { CommonStatus } from "./common";

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

// 部门角色范围, 0:当前部门，1:当前部门和直接子部门
export enum DeptRoleScope {
  Current = "0",
  CurrentChild = "1",
}

/**
 * 获取DeptRoleScope描述
 */
export function getDeptRoleScopeDesc(scope: DeptRoleScope): string {
  switch (scope) {
    case DeptRoleScope.Current:
      return "部门权限";
    case DeptRoleScope.CurrentChild:
      return "部门及子部门权限";
  }
}

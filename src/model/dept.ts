import { CommonStatus } from "./common";

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

// 部门角色范围, 0:当前部门，1:当前部门和直接子部门
export enum DeptRoleScope {
  Current = "0",
  CurrentChild = "1"
}

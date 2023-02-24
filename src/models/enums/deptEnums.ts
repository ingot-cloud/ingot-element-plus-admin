import { newEnumExt } from "../common";

// 部门角色范围, 0:当前部门，1:当前部门和直接子部门
export enum DeptRoleScope {
  Current = "0",
  CurrentChild = "1",
}
export const DeptRoleScopeEnumExtArray = [
  newEnumExt(DeptRoleScope.Current, "部门权限"),
  newEnumExt(DeptRoleScope.CurrentChild, "部门及子部门权限"),
];
export const useDeptRoleScopeEnum = useEnum(DeptRoleScopeEnumExtArray);

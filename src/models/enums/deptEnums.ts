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

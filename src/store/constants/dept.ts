export const moduleName = "dept";

export enum Mutations {
  setDeptTree = "setDeptTree",
  openUpdateFlag = "openUpdateFlag",
}

export enum Getters {
  deptTreeData = "deptTreeData",
  deptTreeListData = "deptTreeListData",
  deptList = "deptList",
}

export enum Actions {
  fetchTree = "fetchTree",
  createDept = "createDept",
  removeDept = "removeDept",
  updateDept = "updateDept",
}

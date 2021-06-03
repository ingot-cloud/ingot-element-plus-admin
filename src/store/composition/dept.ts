import { store } from "@/store";

/**
 * 打开更新部门tree标志
 */
export function openUpdateDeptTreeFlag() {
  store.commit("openUpdateDeptTreeFlag");
}

/**
 * 获取部门信息
 * @returns Primise
 */
export function fetchDeptTree() {
  return store.dispatch("fetchDeptTree");
}

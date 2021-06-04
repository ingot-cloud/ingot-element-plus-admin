import { useStore } from "@/store";
import { DeptTree } from "@/store/types";
import { computed } from "vue";

/**
 * 打开更新部门tree标志
 */
export function openUpdateDeptTreeFlag() {
  const store = useStore();
  store.commit("dept/openUpdateDeptTreeFlag");
}

/**
 * 获取deptData
 * @returns 计算属性
 */
export function getDeptData() {
  const store = useStore();
  return computed(() => store.getters["dept/deptData"]);
}

/**
 * 获取部门信息
 * @returns Primise
 */
export function fetchDeptTree(): Promise<DeptTree> {
  const store = useStore();
  return store.dispatch("dept/fetchTree");
}

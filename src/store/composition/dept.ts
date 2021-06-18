import { useCommit, useDispatch, computedGetter, IngotStore } from "@/store";
import { DeptTree } from "@/store/types";
import { SysDept } from "@/model";
import {
  moduleName,
  Mutations,
  Actions,
  Getters,
} from "@/store/constants/dept";
import { ComputedRef } from "@vue/reactivity";

/**
 * 打开更新部门tree标志
 */
export function openUpdateDeptTreeFlag(): void {
  useCommit(moduleName, Mutations.openUpdateFlag);
}

/**
 * 获取deptData
 * @returns 计算属性
 */
export function computedDeptData(): ComputedRef<DeptTree> {
  return computedGetter<DeptTree>(moduleName, Getters.deptData);
}

/**
 * 获取部门信息
 * @returns Promise
 */
export function fetchDeptTree(store: IngotStore): Promise<DeptTree> {
  return useDispatch(store, moduleName, Actions.fetchTree) as Promise<DeptTree>;
}

/**
 * 创建部门信息
 * @param params 参数
 * @returns Promise
 */
export function createDept(store: IngotStore, params: SysDept): Promise<void> {
  return useDispatch(
    store,
    moduleName,
    Actions.createDept,
    params
  ) as Promise<void>;
}

/**
 * 删除部门
 * @param id ID
 * @returns Promise
 */
export function removeDept(store: IngotStore, id: string): Promise<void> {
  return useDispatch(
    store,
    moduleName,
    Actions.removeDept,
    id
  ) as Promise<void>;
}

/**
 * 更新部门
 * @param params 参数
 * @returns Promise
 */
export function updateDept(store: IngotStore, params: SysDept): Promise<void> {
  return useDispatch(
    store,
    moduleName,
    Actions.updateDept,
    params
  ) as Promise<void>;
}

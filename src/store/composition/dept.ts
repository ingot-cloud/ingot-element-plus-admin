import { useCommit, useDispatch, computedGetter, IngotStore } from "@/store";
import { DeptTree, DeptTreeList } from "@/store/types";
import { SysDept, DeptTreeNode } from "@/model";
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
 * 获取deptTreeData
 * @returns 计算属性
 */
export function computedDeptTreeData(): ComputedRef<DeptTree> {
  return computedGetter<DeptTree>(moduleName, Getters.deptTreeData);
}

/**
 * 获取deptTreeListData
 * @returns 计算属性
 */
export function computedDeptTreeListData(): ComputedRef<DeptTreeList> {
  return computedGetter<DeptTreeList>(moduleName, Getters.deptTreeListData);
}

/**
 * 获取部门树展开列表
 * @returns 计算属性
 */
export function computedList(): ComputedRef<Array<SysDept>> {
  return computedGetter<Array<SysDept>>(moduleName, Getters.deptList);
}

/**
 * 获取部门信息
 * @returns Promise
 */
export function fetchDeptTree(store: IngotStore): Promise<Array<DeptTreeNode>> {
  return useDispatch(store, moduleName, Actions.fetchTree) as Promise<
    Array<DeptTreeNode>
  >;
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

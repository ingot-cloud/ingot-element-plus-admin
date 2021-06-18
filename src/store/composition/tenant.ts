import { useCommit, useDispatch, computedGetter, IngotStore } from "@/store";
import { Page, SysTenant } from "@/model";
import {
  moduleName,
  Mutations,
  Actions,
  Getters,
} from "@/store/constants/tenant";
import { ComputedRef } from "@vue/reactivity";

/**
 * 打开更新标志
 */
export function openUpdateRoleRecordsFlag(): void {
  useCommit(moduleName, Mutations.openUpdateFlag);
}

/**
 * 获取记录
 * @returns 计算属性
 */
export function computedRecords(): ComputedRef<Page<SysTenant>> {
  return computedGetter<Page<SysTenant>>(moduleName, Getters.records);
}

/**
 * 获取数据
 * @returns Promise
 */
export function fetchData(
  store: IngotStore,
  condition?: SysTenant
): Promise<Page<SysTenant>> {
  return useDispatch(
    store,
    moduleName,
    Actions.fetchData,
    condition
  ) as Promise<Page<SysTenant>>;
}

/**
 * 创建
 * @param params 参数
 * @returns Promise
 */
export function createDept(
  store: IngotStore,
  params: SysTenant
): Promise<void> {
  return useDispatch(
    store,
    moduleName,
    Actions.create,
    params
  ) as Promise<void>;
}

/**
 * 删除
 * @param id ID
 * @returns Promise
 */
export function removeDept(store: IngotStore, id: string): Promise<void> {
  return useDispatch(store, moduleName, Actions.remove, id) as Promise<void>;
}

/**
 * 更新
 * @param params 参数
 * @returns Promise
 */
export function updateDept(
  store: IngotStore,
  params: SysTenant
): Promise<void> {
  return useDispatch(
    store,
    moduleName,
    Actions.update,
    params
  ) as Promise<void>;
}

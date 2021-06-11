import { useCommit, useDispatch, computedGetter, IngotStore } from "@/store";
import { Page, RolePageItemVo, SysRole } from "@/model";
import {
  moduleName,
  Mutations,
  Actions,
  Getters
} from "@/store/constants/role";
import { ComputedRef } from "@vue/reactivity";

/**
 * 打开更新标志
 */
export function openUpdateRoleRecordsFlag() {
  useCommit(moduleName, Mutations.openUpdateFlag);
}

/**
 * 获取roleData
 * @returns 计算属性
 */
export function computedRoleData(): ComputedRef<Page<RolePageItemVo>> {
  return computedGetter<Page<RolePageItemVo>>(moduleName, Getters.roleData);
}

/**
 * 获取数据
 * @returns Promise
 */
export function fetchData(store: IngotStore, condition?: SysRole) {
  return useDispatch(
    store,
    moduleName,
    Actions.fetchData,
    condition
  ) as Promise<Page<RolePageItemVo>>;
}

/**
 * 创建
 * @param params 参数
 * @returns Promise
 */
export function createDept(store: IngotStore, params: SysRole) {
  return useDispatch(store, moduleName, Actions.create, params) as Promise<
    void
  >;
}

/**
 * 删除
 * @param id ID
 * @returns Promise
 */
export function removeDept(store: IngotStore, id: string) {
  return useDispatch(store, moduleName, Actions.remove, id) as Promise<void>;
}

/**
 * 更新
 * @param params 参数
 * @returns Promise
 */
export function updateDept(store: IngotStore, params: SysRole) {
  return useDispatch(store, moduleName, Actions.update, params) as Promise<
    void
  >;
}

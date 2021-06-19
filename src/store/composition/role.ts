import {
  useCommit,
  useDispatch,
  computedGetter,
  IngotStore,
  getter,
} from "@/store";
import { RolePageItemVo, SysRole } from "@/model";
import {
  moduleName,
  Mutations,
  Actions,
  Getters,
} from "@/store/constants/role";
import { ComputedRef } from "@vue/reactivity";

/**
 * 打开更新标志
 */
export function openUpdateRoleRecordsFlag(): void {
  useCommit(moduleName, Mutations.openUpdateFlag);
}

/**
 * 获取记录
 * @returns Array
 */
export function records(): Array<RolePageItemVo> {
  return getter<Array<RolePageItemVo>>(moduleName, Getters.records);
}

/**
 * 获取computed记录
 * @returns 计算属性
 */
export function computedRecords(): ComputedRef<Array<RolePageItemVo>> {
  return computedGetter<Array<RolePageItemVo>>(moduleName, Getters.records);
}

/**
 * 获取数据
 * @returns Promise
 */
export function fetchData(
  store: IngotStore,
  condition?: SysRole
): Promise<Array<RolePageItemVo>> {
  return useDispatch(
    store,
    moduleName,
    Actions.fetchData,
    condition
  ) as Promise<Array<RolePageItemVo>>;
}

/**
 * 创建
 * @param params 参数
 * @returns Promise
 */
export function createDept(store: IngotStore, params: SysRole): Promise<void> {
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
export function updateDept(store: IngotStore, params: SysRole): Promise<void> {
  return useDispatch(
    store,
    moduleName,
    Actions.update,
    params
  ) as Promise<void>;
}

import {
  useCommit,
  useDispatch,
  computedGetter,
  IngotStore,
  getter,
} from "@/store";
import { SimpleTenantVo, SysTenant } from "@/model";
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
 * 获取computed simpleRecords
 */
export function computedSimpleRecords(): ComputedRef<Array<SimpleTenantVo>> {
  return computedGetter<Array<SimpleTenantVo>>(
    moduleName,
    Getters.simpleRecords
  );
}

/**
 * 获取记录
 * @returns Array
 */
export function records(): Array<SysTenant> {
  return getter<Array<SysTenant>>(moduleName, Getters.records);
}

/**
 * 获取computed记录
 * @returns 计算属性
 */
export function computedRecords(): ComputedRef<Array<SysTenant>> {
  return computedGetter<Array<SysTenant>>(moduleName, Getters.records);
}

/**
 * 获取简单租户数据列表
 * @returns
 */
export function fetchSimpleList(
  store: IngotStore
): Promise<Array<SimpleTenantVo>> {
  return useDispatch(store, moduleName, Actions.fetchSimpleList) as Promise<
    Array<SimpleTenantVo>
  >;
}

/**
 * 获取数据
 * @returns Promise
 */
export function fetchData(
  store: IngotStore,
  condition?: SysTenant
): Promise<Array<SysTenant>> {
  return useDispatch(
    store,
    moduleName,
    Actions.fetchData,
    condition
  ) as Promise<Array<SysTenant>>;
}

/**
 * 创建
 * @param params 参数
 * @returns Promise
 */
export function create(store: IngotStore, params: SysTenant): Promise<void> {
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
export function remove(store: IngotStore, id: string): Promise<void> {
  return useDispatch(store, moduleName, Actions.remove, id) as Promise<void>;
}

/**
 * 更新
 * @param params 参数
 * @returns Promise
 */
export function update(store: IngotStore, params: SysTenant): Promise<void> {
  return useDispatch(
    store,
    moduleName,
    Actions.update,
    params
  ) as Promise<void>;
}

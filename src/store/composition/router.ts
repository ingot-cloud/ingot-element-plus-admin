import { computed } from "vue";
import { store } from "@/store";
import { IngotStore, RouterModuleState } from "@/types";

/**
 * 动态路由
 */
export function fetchRouters(
  forceRefresh?: boolean
): Promise<RouterModuleState> {
  return store.dispatch("fetchRouters", forceRefresh);
}

/**
 * 获取菜单
 * @param store IngotStore 自定义 Store 类型
 */
export function getMenus(store: IngotStore) {
  return computed(() => store.state.router.menus);
}

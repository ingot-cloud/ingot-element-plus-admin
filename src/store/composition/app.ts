import { computed, ComputedRef } from "vue";
import { IngotStore } from "@/store/types";
import { store, useDispatch, computedGetter } from "@/store";
import { moduleName, Actions, Getters } from "@/store/constants/app";

interface SidebarStatus {
  opened: ComputedRef;
}

interface AppLayoutClass {
  appLayoutClass: ComputedRef;
}

/**
 * 导航条 menu 开关
 */
export function toggleMenu(): void {
  useDispatch(store, moduleName, Actions.toggleSidebar);
}

/**
 * 获取当前 Sidebar 的状态
 * @param store IngotStore 自定义 Store 类型
 */
export function getSidebarStatus(store: IngotStore): SidebarStatus {
  return {
    opened: computedGetter(store, moduleName, Getters.sidebarOpened),
  };
}

/**
 * 获取 AppLayout class
 * @param store IngotStore 自定义 Store 类型
 */
export function getAppLayoutClass(store: IngotStore): AppLayoutClass {
  return {
    appLayoutClass: computed(() => {
      return {
        "hide-sidebar": !store.state.app.sidebar.opened,
      };
    }),
  };
}

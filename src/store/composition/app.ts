import { computed } from "vue";
import { IngotStore } from "@/store/types";
import { store } from "@/store";

/**
 * 导航条 menu 开关
 */
export function toggleMenu() {
  store.dispatch("toggleSidebar");
}

/**
 * 获取当前 Sidebar 的状态
 * @param store IngotStore 自定义 Store 类型
 */
export function getSidebarStatus(store: IngotStore) {
  return {
    opened: computed(() => store.state.app.sidebar.opened)
  };
}

/**
 * 获取 AppLayout class
 * @param store IngotStore 自定义 Store 类型
 */
export function getAppLayoutClass(store: IngotStore) {
  return {
    appLayoutClass: computed(() => {
      return {
        "hide-sidebar": !store.state.app.sidebar.opened
      };
    })
  };
}

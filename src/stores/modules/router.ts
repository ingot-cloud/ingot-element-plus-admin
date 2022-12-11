import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";
import { default as routes } from "@/router/routes";

/**
 * 清洗路由列表，过滤所有不需要显示的menu信息
 * @param menu 需要清洗的路由列表
 */
const filterMenus = (menu: Array<RouteRecordRaw>): Array<RouteRecordRaw> => {
  return menu
    .map((item) => {
      if (item.children) {
        item.children = filterMenus(item.children);
      }
      return item;
    })
    .filter((item) => {
      return item.meta && !item.meta.hidden;
    });
};

export const useRouterStore = defineStore("router", () => {
  const menus = ref<Array<RouteRecordRaw>>([]);
  const dynamicRoutes = ref<Array<RouteRecordRaw>>([]);
  const getMenus = computed(() => menus.value);

  const fetchRoutes = async (forceRefresh?: boolean) => {
    if (forceRefresh || menus.value.length === 0) {
      // todo 发送请求获取菜单列表，并且和固定的routes合并
      dynamicRoutes.value = [];

      menus.value = filterMenus(routes.concat(dynamicRoutes.value));
    }

    return {
      menus: menus.value,
      dynamicRoutes: dynamicRoutes.value,
    };
  };

  return { menus, getMenus, fetchRoutes };
});

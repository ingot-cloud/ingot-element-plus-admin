import type { RouteRecordRaw } from "vue-router";
import type { MenuRouteRecord } from "@/components/layout";
import { default as routes } from "@/router/routes";

/**
 * 生成菜单
 * @param routes 路由表
 */
const generateMenus = (
  routes: Array<RouteRecordRaw>
): Array<MenuRouteRecord> => {
  return routes
    .filter((item) => {
      return !item.meta?.hideMenu;
    })
    .map((item) => {
      const menu: MenuRouteRecord = {
        path: item.path,
        title: item.meta?.title,
        icon: item.meta?.icon,
      };
      if (item.children) {
        menu.children = generateMenus(item.children);
      }
      return menu;
    });
};

export const useRouterStore = defineStore("router", () => {
  const allRoutes = ref<Array<RouteRecordRaw>>([]);
  const dynamicRoutes = ref<Array<RouteRecordRaw>>([]);
  const menus = ref<Array<MenuRouteRecord>>([]);

  const getMenus = computed(() => menus.value);

  const fetchRoutes = async (forceRefresh?: boolean) => {
    if (forceRefresh || menus.value.length === 0) {
      // todo 发送请求获取菜单列表，并且和固定的routes合并
      dynamicRoutes.value = [];

      allRoutes.value = routes.concat(dynamicRoutes.value);
      menus.value = generateMenus(allRoutes.value);
    }

    return {
      menus: menus.value,
      dynamicRoutes: dynamicRoutes.value,
    };
  };

  return { menus, getMenus, fetchRoutes };
});

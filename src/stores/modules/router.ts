import type { RouteRecordRaw } from "vue-router";
import type { MenuRouteRecord } from "@/components/layout";
import { default as routes } from "@/router/routes";
import { GetUserMenuAPI } from "@/api/basic/menu";
import { generateMenus, transformMenu } from "@/router/helper/route";

export const useRouterStore = defineStore("router", () => {
  const allRoutes = ref<Array<RouteRecordRaw>>([]);
  const dynamicRoutes = ref<Array<RouteRecordRaw>>([]);
  const menus = ref<Array<MenuRouteRecord>>([]);

  const getMenus = computed(() => menus.value);

  const fetchRoutes = async (forceRefresh?: boolean) => {
    return new Promise<{
      menus: Array<MenuRouteRecord>;
      dynamicRoutes: Array<RouteRecordRaw>;
    }>((resolve) => {
      if (forceRefresh || menus.value.length === 0) {
        GetUserMenuAPI()
          .then((response) => {
            dynamicRoutes.value = transformMenu(response.data);
            allRoutes.value = routes.concat(dynamicRoutes.value);
            menus.value = generateMenus(allRoutes.value);
            resolve({
              menus: menus.value,
              dynamicRoutes: dynamicRoutes.value,
            });
          })
          .catch(() => {
            resolve({
              menus: menus.value,
              dynamicRoutes: dynamicRoutes.value,
            });
          });
        return;
      }

      resolve({
        menus: menus.value,
        dynamicRoutes: dynamicRoutes.value,
      });
    });
  };

  return { menus, getMenus, fetchRoutes };
});

import type { RouteRecordRaw } from "vue-router";
import type { MenuRouteRecord } from "@/components/layout";
import type { MenuTreeNode } from "@/models";
import { importComponent, NotFound } from "@/router/constants";

/**
 * 生成菜单
 * @param routes 路由表
 */
export const generateMenus = (
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

export const cacheRoutes: Array<string> = [];

export const transformMenu = (
  menus: Array<MenuTreeNode>
): Array<RouteRecordRaw> => {
  const result: Array<RouteRecordRaw> = [];
  menus.forEach((menu) => {
    const route: RouteRecordRaw = menuToRoute(menu);
    if (menu.children?.length) {
      transformMenuItem(route, menu);
    }
    if (menu.isCache && menu.routeName) {
      cacheRoutes.push(menu.routeName);
    }
    result.push(route);
  });

  // 最后加入404视图
  result.push(NotFound);
  return result;
};

const transformMenuItem = (route: RouteRecordRaw, menu: MenuTreeNode) => {
  menu.children?.forEach((item) => {
    const child = menuToRoute(item);
    if (item.children?.length) {
      transformMenuItem(child, item);
    }
    route.children?.push(child);
  });
};

const menuToRoute = (menu: MenuTreeNode) => {
  return {
    path: menu.path as string,
    name: menu.routeName,
    redirect: menu.redirect,
    meta: {
      title: menu.name,
      icon: menu.icon,
      hideMenu: menu.hidden,
      hideBreadcrumb: menu.hideBreadcrumb,
    },
    component: importComponent(menu.viewPath as string),
    props: menu.props,
    children: [],
  };
};

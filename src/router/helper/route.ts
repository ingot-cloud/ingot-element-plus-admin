import type { RouteRecordRaw } from "vue-router";
import type { MenuRouteRecord } from "@/layouts";
import type { MenuTreeNode } from "@/models";
import { MenuType, MenuLinkType } from "@/models/enums";
import { importComponent, NotFound, PagePath } from "@/router/constants";

/**
 * 生成侧栏菜单
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

/**
 * 菜单转换为路由信息
 * @param menus 菜单
 */
export const transformMenu = (
  menus: Array<MenuTreeNode>
): Array<RouteRecordRaw> => {
  const result: Array<RouteRecordRaw> = [];
  menus
    .filter((item) => {
      return item.menuType !== MenuType.Button;
    })
    .forEach((menu) => {
      const route: RouteRecordRaw = menuToRoute(menu);
      if (menu.children?.length) {
        transformMenuItem(route, menu);
      }
      if (menu.isCache && menu.routeName) {
        cacheRoutes.push(menu.routeName);
      }
      result.push(route);
    });

  // 根默认重定向到第0个路径
  result.push({
    path: PagePath.ROOT,
    redirect: result[0].path,
    meta: { hideMenu: true, hideBreadcrumb: true },
  });
  // 最后加入404视图
  result.push(NotFound);
  return result;
};

const transformMenuItem = (route: RouteRecordRaw, menu: MenuTreeNode) => {
  menu.children
    ?.filter((item) => {
      return item.menuType !== MenuType.Button;
    })
    .forEach((item) => {
      const child = menuToRoute(item);
      if (item.children?.length) {
        transformMenuItem(child, item);
      }
      route.children?.push(child);
    });
};

const menuToRoute = (menu: MenuTreeNode) => {
  const meta: any = {
    title: menu.name,
    icon: menu.icon,
    hideMenu: menu.hidden,
    hideBreadcrumb: menu.hideBreadcrumb,
  };
  if (menu.linkType !== MenuLinkType.Default) {
    meta.linkURL = menu.linkUrl;
  }

  return {
    path: menu.path as string,
    name: menu.routeName,
    redirect: menu.redirect,
    meta,
    component: importComponent(menu.viewPath as string),
    props: menu.props,
    children: [],
  };
};

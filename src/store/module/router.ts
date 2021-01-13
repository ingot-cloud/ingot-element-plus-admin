import { Module } from "vuex";
import { RouteRecordRaw } from "vue-router";
import { RootState, RouterModuleState } from "../types";
import { default as routes, notFound } from "@/router/routes";

/**
 * 清洗路由列表，过滤所有不需要显示的menu信息
 * @param menu 需要清洗的路由列表
 */
const filterMenus = (menu: Array<RouteRecordRaw>): Array<RouteRecordRaw> => {
  return menu
    .map(item => {
      if (item.children) {
        item.children = filterMenus(item.children);
      }
      return item;
    })
    .filter(item => {
      return item.meta && !item.meta.hidden;
    });
};

const routerModule: Module<RouterModuleState, RootState> = {
  state: {
    menus: [],
    dynamicRoutes: []
  },
  getters: {
    getMenus(state) {
      return state.menus;
    }
  },
  mutations: {
    setMenu(state, menus: Array<RouteRecordRaw>) {
      state.menus = menus;
    },
    setDynamicRouter(state, routes: Array<RouteRecordRaw>) {
      state.dynamicRoutes = routes;
    }
  },
  actions: {
    fetchRouters({ state, commit }, forceRefresh) {
      let menus = state.menus;
      let dynamicRoutes = state.dynamicRoutes;
      if (forceRefresh || menus.length === 0) {
        // todo 发送请求获取菜单列表，并且和固定的routes合并
        dynamicRoutes = [];

        dynamicRoutes = dynamicRoutes.concat(notFound);
        menus = filterMenus(routes.concat(dynamicRoutes));

        commit("setMenu", menus);
        commit("setDynamicRouter", dynamicRoutes);
      }

      return {
        menus,
        dynamicRoutes
      };
    }
  }
};

export default routerModule;

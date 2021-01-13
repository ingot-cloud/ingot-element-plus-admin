import { Module } from "vuex";
import { RouteRecordRaw } from "vue-router";
import { RootState, RouterModuleState } from "../types";
import { default as routes, notFound } from "@/router/routes";

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
        const finalRoutes = routes.concat(dynamicRoutes).concat(notFound);
        menus = finalRoutes.filter(item => {
          return item.component && item.meta && !item.meta.hidden;
        });
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

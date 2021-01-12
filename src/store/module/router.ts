import { Module } from "vuex";
import { RouteRecordRaw } from "vue-router";
import { RootState, RouterModuleState } from "../types";
import { routes } from "@/router";

const routerModule: Module<RouterModuleState, RootState> = {
  state: {
    menus: [],
    dynamicRoutes: []
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
    fetchRouters({ commit }) {
      // 目前不通过请求获取动态路由菜单
      //   const menu = routes.filter(item => {
      //       item.
      //   })
      // todo
    }
  }
};

export default routerModule;

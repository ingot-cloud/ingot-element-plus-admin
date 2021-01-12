import { Store } from "vuex";
import { RouteRecordRaw } from "vue-router";

/* Ingot Store */
export type IngotStore = Store<AllState>;

/* 定义 State 接口 */
export interface AllState extends RootState {
  app: AppModuleState;
  router: RouterModuleState;
}

export interface RootState {
  title: string;
  theme: Theme;
}

export interface AppModuleState {
  sidebar: StateSideBar;
}

export interface RouterModuleState {
  menus: Array<RouteRecordRaw>;
  dynamicRoutes: Array<RouteRecordRaw>;
}

/* 定义 State 中使用的类型  */
export type Theme = "Default" | "Dark";

export interface StateSideBar {
  opened?: boolean;
}

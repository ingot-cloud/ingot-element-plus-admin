import { Store } from "vuex";
import { RouteRecordRaw } from "vue-router";
import { UserToken, User } from "@/model";

/* Ingot Store */
export type IngotStore = Store<AllState>;

/**
 * 全局 state
 */
export interface RootState {
  title: string;
  theme: Theme;
}

/**
 * 所有 state
 */
export interface AllState extends RootState {
  app: AppModuleState;
  router: RouterModuleState;
  auth: AuthModuleState;
}

/* 模块状态 */
export interface AppModuleState {
  sidebar: StateSideBar;
}
export interface RouterModuleState {
  menus: Array<RouteRecordRaw>;
  dynamicRoutes: Array<RouteRecordRaw>;
}
export interface AuthModuleState {
  token: UserToken;
  user: User;
  roles: Array<string>;
}

/* 定义 State 中使用的类型  */
export type Theme = "Default" | "Dark";

export interface StateSideBar {
  opened?: boolean;
}

import { RouteRecordRaw } from "vue-router";
import { UserToken, User } from "@/model";
import { StateSideBar } from "./cmp";

/* 核心模块状态 */
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

import type { BaseNavigationGuard } from "@/router/types";
import type { Router } from "vue-router";
import { AuthGuard } from "./authGuard";
import { UserInfoGuard } from "./userGuard";
import { DynamicRouterGuard } from "./dynamicGuard";
import { GlobalGuard } from "./globalGuard";
import { EndGuard } from "./endGuard";

const guardList: Array<BaseNavigationGuard> = [
  new GlobalGuard(),
  new DynamicRouterGuard(),
  new UserInfoGuard(),
  new AuthGuard(),
  new EndGuard(),
];

guardList.sort((l, r) => {
  return l.order() - r.order();
});

export const setupGuard = (router: Router) => {
  // 注册 guard
  guardList.forEach(async (guard) => {
    router.beforeEach(guard.proxy(router));
  });
};

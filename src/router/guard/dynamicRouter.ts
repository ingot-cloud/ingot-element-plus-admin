import type { NavigationGuardWithThis, Router } from "vue-router";
import { BaseNavigationGuard } from "@/router/types";
import { userRouterStore } from "@/stores/modules/router";

export class DynamicRouterGuard extends BaseNavigationGuard {
  public static get(): DynamicRouterGuard {
    return new DynamicRouterGuard();
  }

  public exec(router: Router): NavigationGuardWithThis<undefined> {
    return async (to, from) => {
      // todo 添加动态路由到 router
      const result = await userRouterStore().fetchRouters();
      result.dynamicRoutes.forEach((route) => {
        router.addRoute(route);
      });

      return true;
    };
  }
}

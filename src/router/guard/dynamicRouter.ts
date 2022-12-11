import type { NavigationGuardWithThis, Router } from "vue-router";
import { BaseNavigationGuard } from "@/router/types";
import { useRouterStore } from "@/stores/modules/router";

export class DynamicRouterGuard extends BaseNavigationGuard {
  public static get(): DynamicRouterGuard {
    return new DynamicRouterGuard();
  }

  public exec(router: Router): NavigationGuardWithThis<undefined> {
    return async () => {
      // todo 添加动态路由到 router
      const result = await useRouterStore().fetchRoutes();
      result.dynamicRoutes.forEach((route) => {
        router.addRoute(route);
      });

      return true;
    };
  }
}

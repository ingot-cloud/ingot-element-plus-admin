import { NavigationGuardWithThis, Router } from "vue-router";
import { BaseNavigationGuard } from "@/router/types";
import { fetchRouters } from "@/store/composition/router";

export class DynamicRouterGuard extends BaseNavigationGuard {
  public static get(): DynamicRouterGuard {
    return new DynamicRouterGuard();
  }

  public exec(router: Router): NavigationGuardWithThis<undefined> {
    return async (to) => {
      // todo 添加动态路由到 router
      const result = await fetchRouters();
      result.dynamicRoutes.forEach((route) => {
        router.addRoute(route);
      });

      return to;
    };
  }
}

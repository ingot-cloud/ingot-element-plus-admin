import type { NavigationGuardWithThis, Router } from "vue-router";
import { BaseNavigationGuard } from "@/router/types";
import { useRouterStore } from "@/stores/modules/router";

export class DynamicRouterGuard extends BaseNavigationGuard {
  public order(): number {
    return 30;
  }

  public exec(router: Router): NavigationGuardWithThis<undefined> {
    return async (to) => {
      const result = await useRouterStore().fetchRoutes();
      result.dynamicRoutes.forEach((route) => {
        router.addRoute(route);
      });

      return { path: to.fullPath, replace: true, query: to.query };
    };
  }
}

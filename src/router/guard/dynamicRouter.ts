import { NavigationGuardWithThis } from "vue-router";
import { BaseNavigationGuard } from "@/router/types";
import { fetchRouters } from "@/store/composition/router";

export class DynamicRouterGuard extends BaseNavigationGuard {
  public static get() {
    return new DynamicRouterGuard();
  }

  public exec(): NavigationGuardWithThis<undefined> {
    return async to => {
      // todo 添加动态路由到 router
      const { dynamicRoutes } = await fetchRouters();
      console.log("DynamicRouterGuard", to.fullPath, dynamicRoutes);
    };
  }
}

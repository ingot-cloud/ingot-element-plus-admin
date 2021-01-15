import { NavigationGuardWithThis } from "vue-router";
import { NavigationGuard } from "@/types";
import { fetchRouters } from "@/store/composition/router";

export class DynamicRouterGuard implements NavigationGuard {
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

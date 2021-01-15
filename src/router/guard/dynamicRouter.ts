import { NavigationGuardWithThis } from "vue-router";
import { NavigationGuard } from "@/router/types";
import { fetchRouters } from "@/store/composition/router";

export class DynamicRouterGuard implements NavigationGuard {
  public static get() {
    return new DynamicRouterGuard();
  }

  public exec(): NavigationGuardWithThis<undefined> {
    return async to => {
      if (to.skipNextGuard) {
        return true;
      }

      // todo 添加动态路由到 router
      const { dynamicRoutes } = await fetchRouters();
      console.log("DynamicRouterGuard", to.fullPath, dynamicRoutes);
    };
  }
}

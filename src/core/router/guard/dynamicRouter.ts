import { NavigationGuardWithThis } from "vue-router";
import { BaseNavigationGuard } from "@/core/router/types";
import { fetchRouters } from "@/core/store/composition/router";

export class DynamicRouterGuard extends BaseNavigationGuard {
  public static get() {
    return new DynamicRouterGuard();
  }

  public exec(): NavigationGuardWithThis<undefined> {
    return async () => {
      // todo 添加动态路由到 router
      await fetchRouters();
    };
  }
}

import type { NavigationGuardWithThis } from "vue-router";
import { BaseNavigationGuard } from "@/router/types";
import { useUserInfoStore } from "@/stores/modules/auth";

export class UserInfoGuard extends BaseNavigationGuard {
  public order(): number {
    return 20;
  }

  public exec(): NavigationGuardWithThis<undefined> {
    const globalLoading = useGlobalLoading();
    return async (to) => {
      // 1. 是否需要用户认证，如果不需要则直接跳过
      // 2. 判断用户信息是否存在，若存在则直接进入页面
      // 3. 若不存在则获取用户信息，并且刷新路由信息
      const { getUserInfoWhetherExist } = storeToRefs(useUserInfoStore());
      const exist = getUserInfoWhetherExist.value;
      if (!to.meta.permitAuth && !exist) {
        return await new Promise<boolean>((resolve) => {
          globalLoading.start();
          useUserInfoStore()
            .fetchUserInfo()
            .then(() => {
              to.meta.dynamicRoutes = true;
              resolve(true);
            })
            .catch(() => {
              resolve(false);
            });
        });
      }

      return true;
    };
  }
}

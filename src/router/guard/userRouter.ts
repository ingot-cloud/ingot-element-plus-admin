import type { NavigationGuardWithThis } from "vue-router";
import { BaseNavigationGuard } from "@/router/types";
import { useUserInfoStore } from "@/stores/modules/auth";

export class UserInfoGuard extends BaseNavigationGuard {
  public order(): number {
    return 20;
  }

  public exec(): NavigationGuardWithThis<undefined> {
    return async (to) => {
      // 1. 判断用户信息是否存在，若存在则直接进入页面
      // 2. 若不存在则获取用户信息，并且刷新路由信息
      const { getUserInfoWhetherExist } = storeToRefs(useUserInfoStore());
      const exist = getUserInfoWhetherExist.value;
      if (!exist) {
        return await new Promise<boolean>((resolve) => {
          useUserInfoStore()
            .fetchUserInfo()
            .then(() => {
              resolve(true);
            })
            .catch(() => {
              resolve(false);
            });
        });
      }

      // 跳过动态路由逻辑
      to.skipAfterGuard = true;
    };
  }
}

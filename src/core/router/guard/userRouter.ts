import { NavigationGuardWithThis } from "vue-router";
import { BaseNavigationGuard } from "@/core/router/types";
import { store } from "@/store";

export class UserInfoGuard extends BaseNavigationGuard {
  public static get() {
    return new UserInfoGuard();
  }

  public exec(): NavigationGuardWithThis<undefined> {
    return to => {
      // 1. 判断用户信息是否存在，若存在则直接进入页面
      // 2. 若不存在则获取用户信息，并且刷新路由信息
      const existUserInfo = store.getters.existUserInfo;
      if (!existUserInfo) {
        return new Promise(resolve => {
          store
            .dispatch("fetchUserInfo")
            .then(() => {
              resolve(true);
            })
            .catch(() => {
              resolve(false);
            });
        });
      } else {
        // 跳过动态路由逻辑
        to.skipAfterGuard = true;
      }
    };
  }
}

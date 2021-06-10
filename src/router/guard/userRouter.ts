import { NavigationGuardWithThis } from "vue-router";
import { BaseNavigationGuard } from "@/router/types";
import { store } from "@/store";

export class UserInfoGuard extends BaseNavigationGuard {
  public static get() {
    return new UserInfoGuard();
  }

  public exec(): NavigationGuardWithThis<undefined> {
    return async to => {
      // 1. 判断用户信息是否存在，若存在则直接进入页面
      // 2. 若不存在则获取用户信息，并且刷新路由信息
      const existUserInfo = store.getters.existUserInfo;
      if (!existUserInfo) {
        return await new Promise<boolean>(resolve => {
          store
            .dispatch("fetchUserInfo")
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
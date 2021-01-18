import { NavigationGuardWithThis } from "vue-router";
import { BaseNavigationGuard } from "@/core/router/types";

export class UserInfoGuard extends BaseNavigationGuard {
  public static get() {
    return new UserInfoGuard();
  }

  public exec(): NavigationGuardWithThis<undefined> {
    return to => {
      console.log("UserInfoGuard", to.fullPath);
      // 1. 判断用户信息是否存在，若存在则直接进入页面
      // 2. 若不存在则获取用户信息，并且刷新路由信息
    };
  }
}

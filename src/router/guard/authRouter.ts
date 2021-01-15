import { NavigationGuardWithThis, Router } from "vue-router";
import { NavigationGuard } from "@/types";
import { store } from "@/store";

export class AuthGuard implements NavigationGuard {
  public static get() {
    return new AuthGuard();
  }

  public exec(router: Router): NavigationGuardWithThis<undefined> {
    return to => {
      // 1. 判断页面是否需要鉴权，若不需要则直接进入
      // 2. 若需要鉴权，判断 token 是否存在，如果不存在那么重定向到登录页面
      // 3. 若token存在，走用户信息拦截器
      if (!to.meta.permitAuth) {
        const token = store.getters.accessToken;
        if (!token || token.length === "") {
          router.replace({ path: "/login" });
          return false;
        }
      }
    };
  }
}

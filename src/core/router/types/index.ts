import { NavigationGuardWithThis, Router } from "vue-router";

export interface NavigationGuard {
  exec: (router: Router) => NavigationGuardWithThis<undefined>;
}

export class BaseNavigationGuard implements NavigationGuard {
  public proxy(router: Router) {
    return new Proxy(this.exec(router), {
      apply(target, thisArg, argArray) {
        const to = argArray[0];
        // 如果跳过后面所有 NavigationGuard
        if (to.skipAfterGuard) {
          return true;
        }
        return Reflect.apply(target, thisArg, argArray);
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public exec(router: Router): NavigationGuardWithThis<undefined> {
    return () => {
      // default
    };
  }
}

import { NavigationGuardWithThis, Router } from "vue-router";

export interface NavigationGuard {
  exec: (router: Router) => NavigationGuardWithThis<undefined>;
}

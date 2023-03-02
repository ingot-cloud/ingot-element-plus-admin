import type { NavigationGuardWithThis } from "vue-router";
import { BaseNavigationGuard } from "@/router/types";
import CancelManager from "@/net/cancel";
import { useTenantStore } from "@/stores/modules/tenant";
import { isKeepTenant } from "../helper/tenant";

export class GlobalGuard extends BaseNavigationGuard {
  public order(): number {
    return 1;
  }

  public exec(): NavigationGuardWithThis<undefined> {
    return (to, from) => {
      CancelManager.abort();
      if (!isKeepTenant(to) && !isKeepTenant(from)) {
        useTenantStore().resetGlobalTenant();
      }
      return true;
    };
  }
}

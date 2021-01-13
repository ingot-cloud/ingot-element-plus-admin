import { store } from "@/store";
import { RouterModuleState } from "@/store/types";

/**
 * 动态路由
 */
export function fetchRouters(
  forceRefresh?: boolean
): Promise<RouterModuleState> {
  return store.dispatch("fetchRouters", forceRefresh);
}

import { computed } from "vue";
import { IngotStore } from "@/core/model";

/**
 * 用户信息
 * @param store
 */
export function user(store: IngotStore) {
  return computed(() => store.state.auth.user);
}

/**
 * 角色
 * @param store
 */
export function roles(store: IngotStore) {
  return computed(() => store.state.auth.roles);
}

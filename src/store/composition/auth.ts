import { computed, ComputedRef } from "vue";
import { UserToken, UserInfo } from "@/model";
import { IngotStore } from "@/store/types";
import { store, useDispatch, getter } from "@/store";
import { moduleName, Actions, Getters } from "@/store/constants/auth";

/**
 * 用户信息
 * @param store
 */
export function user(store: IngotStore): ComputedRef {
  return computed(() => store.state.auth.user);
}

/**
 * 角色
 * @param store
 */
export function roles(store: IngotStore): ComputedRef {
  return computed(() => store.state.auth.roles);
}

/**
 * 是否存在用户信息
 */
export function existUserInfo(): any {
  return getter(store, moduleName, Getters.existUserInfo);
}

/**
 * 获取 AccessToken
 */
export function getAccessToken(): any {
  return getter(store, moduleName, Getters.accessToken);
}

/**
 * 更新用户Token
 * @param token UserToken
 */
export function updateToken(token: UserToken): void {
  useDispatch(store, moduleName, Actions.updateToken, token);
}

/**
 * 刷新token
 */
export function refreshToken(): Promise<UserToken> {
  return useDispatch(
    store,
    moduleName,
    Actions.refreshToken
  ) as Promise<UserToken>;
}

/**
 * 获取用户信息
 */
export function fetchUserInfo(): Promise<UserInfo> {
  return useDispatch(
    store,
    moduleName,
    Actions.fetchUserInfo
  ) as Promise<UserInfo>;
}

/**
 * 退出登录
 */
export function handlLogout(): void {
  useDispatch(store, moduleName, Actions.clear)?.then(() => {
    location.reload();
  });
}

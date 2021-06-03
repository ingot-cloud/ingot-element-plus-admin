import { store } from "@/store";

/**
 * 退出登录
 * @param router
 */
export const handlLogout = () => {
  store.dispatch("clear").then(() => {
    location.reload();
  });
};

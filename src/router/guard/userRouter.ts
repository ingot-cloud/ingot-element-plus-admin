import { NavigationGuardWithThis } from "vue-router";

const userRouter: NavigationGuardWithThis<undefined> = to => {
  if (to.terminateGuard) {
    return false;
  }

  // 1. 判断用户信息是否存在，若存在则直接进入页面
  // 2. 若不存在则获取用户信息，并且刷新路由信息

  console.log("userRouter", to);
};

export default userRouter;

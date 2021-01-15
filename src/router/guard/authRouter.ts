import { nextTick } from "vue";
import { NavigationGuardWithThis } from "vue-router";

const authRouter: NavigationGuardWithThis<undefined> = (to, from, next) => {
  // 1. 判断页面是否需要鉴权，若不需要则直接进入
  // 2. 若需要鉴权，判断 token 是否存在，如果不存在那么重定向到登录页面
  // 3. 若token存在，走用户信息拦截器
  if (to.meta.requiresAuth) {
    console.log("requiresAuth");
  } else {
    next();
  }
};

export default authRouter;

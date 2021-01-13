import { NavigationGuardWithThis } from "vue-router";
import { fetchRouters } from "@/store/composition/router";

const dynamicRouter: NavigationGuardWithThis<undefined> = (to, from) => {
  console.log("dynamicRouter", to.fullPath, from.fullPath);
  return new Promise(resolve => {
    fetchRouters().then(state => {
      // todo 添加动态路由到 router
      state.dynamicRoutes;
      resolve(true);
    });
  });
};

export default dynamicRouter;

import { NavigationGuardWithThis } from "vue-router";
import { fetchRouters } from "@/store/composition/router";

const dynamicRouter: NavigationGuardWithThis<undefined> = (to, from) => {
  return new Promise(resolve => {
    fetchRouters().then(state => {
      // todo 添加动态路由到 router
      state.dynamicRoutes;
      console.log(state.menus);
      resolve(true);
    });
  });
};

export default dynamicRouter;

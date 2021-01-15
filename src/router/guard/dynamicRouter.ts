import { NavigationGuardWithThis } from "vue-router";
import { fetchRouters } from "@/store/composition/router";

const dynamicRouter: NavigationGuardWithThis<undefined> = async to => {
  if (to.terminateGuard) {
    return false;
  }
  // todo 添加动态路由到 router
  const { dynamicRoutes } = await fetchRouters();
  console.log("dynamic", dynamicRoutes, to.fullPath);
};

export default dynamicRouter;

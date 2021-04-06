import { createRouter, createWebHashHistory } from "vue-router";
import routes from "@/router/routes";
import guardList from "@/core/router/guard";

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 注册 guard
guardList.forEach(async guard => {
  router.beforeEach(guard.proxy(router));
});

export default router;

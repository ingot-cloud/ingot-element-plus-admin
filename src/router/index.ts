import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes";
import guardList from "@/router/guard";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 注册 guard
guardList.forEach(async (guard) => {
  router.beforeEach(guard.proxy(router));
});

export default router;

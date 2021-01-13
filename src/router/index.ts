import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";
import guardList from "./guard";

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 注册 guard
guardList.forEach(guard => router.beforeEach(guard));

export default router;

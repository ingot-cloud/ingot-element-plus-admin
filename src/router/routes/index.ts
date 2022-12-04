import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)",
    name: "NotFound",
    meta: { hidden: true },
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
];

export default routes;

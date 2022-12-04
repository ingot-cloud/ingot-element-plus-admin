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
    name: "Home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "LoginPage",
    component: () => import("@/views/security/login/LoginPage.vue"),
  },
];

export default routes;

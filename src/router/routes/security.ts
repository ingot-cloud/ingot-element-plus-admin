import type { RouteRecordRaw } from "vue-router";

/**
 * 安全路由
 */
export const securityRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "LoginPage",
    meta: {
      permitAuth: true,
      hideMenu: true,
      breadcrumbHidden: true,
    },
    component: () => import("@/views/security/login/LoginPage.vue"),
  },
];

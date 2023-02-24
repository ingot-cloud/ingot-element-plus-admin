import type { RouteRecordRaw } from "vue-router";

/**
 * 安全路由
 */
export const securityRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    meta: {
      permitAuth: true,
      hideMenu: true,
      breadcrumbHidden: true,
    },
    component: () => import("@/pages/security/login/IndexPage.vue"),
  },
];

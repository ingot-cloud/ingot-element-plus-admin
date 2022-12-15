import type { RouteRecordRaw } from "vue-router";
import InAppLayout from "@/components/layout/InAppLayout.vue";
import BasicRoutes from "./basic";
import { PageNameEnum, PagePathEnum, RedirectField } from "@/enums/pageEnums";

/**
 * 公共路由
 */
export const commonRoutes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)",
    name: "NotFound",
    meta: { hidden: true },
    component: () => import("@/views/common/errors/NotFound.vue"),
  },
  {
    path: "/redirect",
    component: InAppLayout,
    name: "RedirectTo",
    meta: {
      title: PageNameEnum.REDIRECT,
      hidden: true,
    },
    children: [
      {
        props: true,
        path: `/redirect/:${RedirectField.PATH}(.*):${RedirectField.TYPE}(.*)`,
        name: PageNameEnum.REDIRECT,
        component: () => import("@/views/common/redirect/RedirectPage.vue"),
        meta: {
          title: PageNameEnum.REDIRECT,
          hidden: true,
        },
      },
    ],
  },
  {
    path: "/",
    name: "Root",
    redirect: PagePathEnum.HOME,
    component: InAppLayout,
    meta: {
      hidden: false,
    },
    children: [
      {
        path: PagePathEnum.HOME,
        meta: {
          title: "首页",
          icon: "home",
          isAffix: true,
        },
        component: () => import("@/views/dashboard/DashboardPage.vue"),
      },
    ],
  },
];

/**
 * 安全路由
 */
export const securityRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "LoginPage",
    meta: {
      permitAuth: true,
      hidden: true,
    },
    component: () => import("@/views/security/login/LoginPage.vue"),
  },
];

const routes: Array<RouteRecordRaw> = [
  ...commonRoutes,
  ...securityRoutes,
  ...BasicRoutes,
];

export default routes;

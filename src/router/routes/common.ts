import type { RouteRecordRaw } from "vue-router";
import {
  PageNameEnum,
  PagePathEnum,
  RedirectField,
} from "@/models/enums/pageEnums";

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
    component: () => import("@/components/layout/InAppLayout.vue"),
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
    component: () => import("@/components/layout/InAppLayout.vue"),
    meta: {
      hidden: false,
    },
    children: [
      {
        path: PagePathEnum.HOME,
        meta: {
          title: "首页",
          icon: "ingot:home",
          isAffix: true,
        },
        component: () => import("@/views/dashboard/DashboardPage.vue"),
      },
    ],
  },
];

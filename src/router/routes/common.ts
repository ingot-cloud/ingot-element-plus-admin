import type { RouteRecordRaw } from "vue-router";
import { PageNameEnum, PagePathEnum, RedirectField } from "@/models/enums";
import { LAYOUT_MAIN } from "@/router/constants";

/**
 * 公共路由
 */
export const commonRoutes: Array<RouteRecordRaw> = [
  {
    path: "/redirect",
    component: LAYOUT_MAIN,
    meta: {
      title: PageNameEnum.REDIRECT,
      hideMenu: true,
      hideBreadcrumb: true,
    },
    children: [
      {
        props: true,
        path: `/redirect/:${RedirectField.PATH}(.*):${RedirectField.TYPE}(.*)`,
        name: PageNameEnum.REDIRECT,
        component: () => import("@/pages/common/redirect/IndexPage.vue"),
        meta: {
          title: PageNameEnum.REDIRECT,
          hideMenu: true,
          hideBreadcrumb: true,
        },
      },
    ],
  },
  {
    path: "/",
    redirect: PagePathEnum.HOME,
    component: LAYOUT_MAIN,
    children: [
      {
        path: PagePathEnum.HOME,
        meta: {
          title: "首页",
          icon: "ingot:home",
          isAffix: true,
        },
        component: () => import("@/pages/dashboard/IndexPage.vue"),
      },
    ],
  },
  {
    path: "/500",
    meta: { hideMenu: true, breadcrumbHidden: true, permitAuth: true },
    component: () => import("@/pages/common/errors/500Page.vue"),
  },
  {
    path: "/403",
    meta: { hideMenu: true, breadcrumbHidden: true, permitAuth: true },
    component: () => import("@/pages/common/errors/403Page.vue"),
  },
  {
    path: "/404",
    meta: { hideMenu: true, breadcrumbHidden: true, permitAuth: true },
    component: () => import("@/pages/common/errors/404Page.vue"),
  },
];

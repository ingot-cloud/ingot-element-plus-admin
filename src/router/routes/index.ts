import type { RouteRecordRaw } from "vue-router";
import InAppLayout from "@/components/layout/InAppLayout.vue";
import BasicRoutes from "./basic";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)",
    name: "NotFound",
    meta: { hidden: true },
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/",
    name: "Root",
    redirect: "/home",
    component: InAppLayout,
    meta: {
      hidden: false,
    },
    children: [
      {
        path: "/home",
        meta: {
          title: "首页",
          icon: "home",
        },
        component: () => import("@/views/dashboard/DashboardPage.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "LoginPage",
    meta: {
      permitAuth: true,
      hidden: true,
    },
    component: () => import("@/views/security/login/LoginPage.vue"),
  },

  ...BasicRoutes,
];

export default routes;

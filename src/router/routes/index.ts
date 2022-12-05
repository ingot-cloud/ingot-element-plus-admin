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
    redirect: "/dashboard",
    component: InAppLayout,
    meta: {
      hidden: false,
    },
    children: [
      {
        path: "/dashboard",
        meta: {
          title: "Ingot Cloud",
          icon: "dash-board",
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

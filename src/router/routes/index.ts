import type { RouteRecordRaw } from "vue-router";
import AppLayout from "@/components/AppLayout.vue";

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
    component: AppLayout,
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
    component: () => import("@/views/security/login/LoginPage.vue"),
  },
];

export default routes;

import type { RouteRecordRaw } from "vue-router";
import InAppLayout from "@/components/InAppLayout.vue";

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
];

export default routes;

import { RouteRecordRaw } from "vue-router";
import AppLayout from "@/core/component/layout/IngotAppLayout.vue";
import AuthorityRoutes from "./authority";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)",
    name: "NotFound",
    meta: { hidden: true },
    component: () => import("@/views/404.vue")
  },
  {
    path: "/",
    name: "Root",
    redirect: "/dashboard",
    component: AppLayout,
    meta: {
      hidden: false
    },
    children: [
      {
        path: "/dashboard",
        meta: {
          title: "Ingot Cloud",
          icon: "dash-board"
        },
        component: () => import("@/views/dashboard/index.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      permitAuth: true,
      hidden: true
    },
    component: () => import("@/views/security/login/index.vue")
  },
  // 权限管理路由
  ...AuthorityRoutes
];

export default routes;

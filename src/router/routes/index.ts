import { RouteRecordRaw } from "vue-router";
import AppLayout from "@/views/layout/AppLayout.vue";
import AuthorityRoutes from "./authority";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/404",
    name: "NotFound",
    meta: { hidden: true },
    component: () => import("@/views/404.vue")
  },
  {
    path: "/",
    redirect: "/home",
    component: AppLayout,
    meta: {
      hidden: false
    },
    children: [
      {
        path: "/home",
        meta: {
          title: "Ingot Cloud",
          icon: "dash-board"
        },
        component: () => import("@/views/home/index.vue")
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

export const notFound: RouteRecordRaw = { path: "*", redirect: "/404" };
export default routes;

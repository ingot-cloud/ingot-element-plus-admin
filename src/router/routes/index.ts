import { RouteRecordRaw } from "vue-router";
import AppLayout from "@/views/layout/AppLayout.vue";
import ManagementRoutes from "./management";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/404",
    meta: { hidden: true },
    component: () => import("@/views/404.vue")
  },
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: AppLayout,
    meta: {
      hidden: false
    },
    children: [
      {
        path: "/home",
        meta: {
          title: "Ingot Cloud",
          icon: ""
        },
        component: () => import("@/views/home/index.vue")
      }
    ]
  },
  // 系统管理路由
  ...ManagementRoutes
];

export const notFound: RouteRecordRaw = { path: "*", redirect: "/404" };
export default routes;

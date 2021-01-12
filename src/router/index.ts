import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import AppLayout from "@/views/layout/AppLayout.vue";
import ManagementRoutes from "./module/management";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: AppLayout,
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
  ...ManagementRoutes,
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;

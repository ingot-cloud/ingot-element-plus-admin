import { RouteRecordRaw } from "vue-router";
import AppLayout from "@/views/layout/AppLayout.vue";

// 系统管理路由
const managementRoutes: Array<RouteRecordRaw> = [
  {
    name: "SysManager",
    path: "/management",
    component: AppLayout,
    redirect: "/management/user",
    meta: {
      title: "系统管理",
      icon: "management"
    },
    children: [
      {
        name: "SysManagerUserManager",
        meta: {
          title: "用户管理",
          icon: "user"
        },
        path: "/management/user",
        component: () => import("@/views/management/user/index.vue")
      }
    ]
  }
];

export default managementRoutes;

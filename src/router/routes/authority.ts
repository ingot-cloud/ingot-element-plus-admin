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
      title: "权限管理",
      icon: "authority"
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
      },
      {
        name: "SysManagerDeptManager",
        meta: {
          title: "部门管理",
          icon: "dept"
        },
        path: "/management/dept",
        component: () => import("@/views/management/dept/index.vue")
      }
    ]
  }
];

export default managementRoutes;

import { RouteRecordRaw } from "vue-router";
import AppLayout from "@/core/components/layout/IngotAppLayout.vue";

// 系统管理路由
const managementRoutes: Array<RouteRecordRaw> = [
  {
    name: "SysAuthority",
    path: "/authority",
    component: AppLayout,
    redirect: "/authority/user",
    meta: {
      title: "权限管理",
      icon: "authority"
    },
    children: [
      {
        name: "SysAuthorityUserManager",
        meta: {
          title: "用户管理",
          icon: "user"
        },
        path: "/authority/user",
        component: () => import("@/views/authority/user/index.vue")
      },
      {
        name: "SysAuthorityDeptManager",
        meta: {
          title: "部门管理",
          icon: "dept"
        },
        path: "/authority/dept",
        component: () => import("@/views/authority/dept/index.vue")
      }
    ]
  }
];

export default managementRoutes;

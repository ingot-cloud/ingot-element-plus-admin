import { RouteRecordRaw } from "vue-router";
import AppLayout from "@/components/Layout/IngotAppLayout.vue";

// 系统管理路由
const managementRoutes: Array<RouteRecordRaw> = [
  {
    name: "SysAuthority",
    path: "/authority",
    component: AppLayout,
    redirect: "/authority/user",
    meta: {
      title: "权限管理",
      icon: "authority",
    },
    children: [
      {
        name: "SysAuthorityUserManager",
        meta: {
          title: "用户管理",
          icon: "user",
        },
        path: "/authority/user",
        component: () => import("@/views/authority/user/home/index.vue"),
      },
      {
        name: "SysAuthorityUserManagerDetail",
        meta: {
          title: "用户详情",
          hidden: true,
        },
        path: "/authority/user/detail/:id",
        component: () => import("@/views/authority/user/detail/index.vue"),
        props: true,
      },
      {
        name: "SysAuthorityDeptManager",
        meta: {
          title: "部门管理",
          icon: "dept",
        },
        path: "/authority/dept",
        component: () => import("@/views/authority/dept/index.vue"),
      },
      {
        name: "SysAuthorityRoleManager",
        meta: {
          title: "角色管理",
          icon: "role",
        },
        path: "/authority/role",
        redirect: "/authority/role/list",
        component: () => import("@/views/authority/role/index.vue"),
        children: [
          {
            name: "SysAuthorityRoleManagerList",
            meta: {
              title: "角色管理",
              icon: "role",
            },
            path: "/authority/role/list",
            component: () => import("@/views/authority/role/list/index.vue"),
          },
          {
            name: "SysAuthorityRoleManagerBindUser",
            meta: {
              title: "绑定用户",
              hidden: true,
            },
            path: "/authority/role/binduser/:id",
            component: () =>
              import("@/views/authority/role/binduser/index.vue"),
            props: true,
          },
        ],
      },
      {
        name: "SysAuthorityTenantManager",
        meta: {
          title: "租户管理",
          icon: "tenant",
        },
        path: "/authority/tenant",
        component: () => import("@/views/authority/tenant/index.vue"),
      },
      {
        name: "SysAuthorityMenuManager",
        meta: {
          title: "菜单管理",
          icon: "menu",
        },
        path: "/authority/menu",
        component: () => import("@/views/authority/menu/index.vue"),
      },
      {
        name: "SysAuthorityAuthorityManager",
        meta: {
          title: "权限管理",
          icon: "authority",
        },
        path: "/authority/authority",
        component: () => import("@/views/authority/authority/home/index.vue"),
      },
      {
        name: "SysAuthorityClientManager",
        meta: {
          title: "客户端管理",
          icon: "client",
        },
        path: "/authority/client",
        component: () => import("@/views/authority/client/home/index.vue"),
      },
    ],
  },
];

export default managementRoutes;

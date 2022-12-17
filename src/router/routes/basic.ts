import type { RouteRecordRaw } from "vue-router";
import InAppLayout from "@/components/layout/InAppLayout.vue";

// 基础管理路由
export const basicRoutes: Array<RouteRecordRaw> = [
  {
    name: "Basic",
    path: "/basic",
    component: InAppLayout,
    redirect: "/basic/user",
    meta: {
      title: "基础管理",
      icon: "basic",
    },
    children: [
      {
        name: "BasicUser",
        meta: {
          title: "用户管理",
        },
        path: "/basic/user",
        component: () => import("@/views/basic/user/UserPage.vue"),
      },
      {
        name: "BasicDept",
        meta: {
          title: "部门管理",
        },
        path: "/basic/dept",
        component: () => import("@/views/basic/dept/DeptPage.vue"),
      },
      {
        name: "BasicRole",
        meta: {
          title: "角色管理",
        },
        path: "/basic/role",
        redirect: "/basic/role/list",
        component: () => import("@/views/basic/role/RoleLayout.vue"),
        children: [
          {
            name: "BasicRoleList",
            meta: {
              title: "角色管理",
            },
            path: "/basic/role/list",
            component: () => import("@/views/basic/role/home/RolePage.vue"),
          },
          //   {
          //     name: "SysAuthorityRoleManagerBindUser",
          //     meta: {
          //       title: "绑定用户",
          //       hidden: true,
          //     },
          //     path: "/basic/role/binduser/:id",
          //     component: () =>
          //       import("@/views/authority/role/binduser/index.vue"),
          //     props: true,
          //   },
          //   {
          //     name: "SysAuthorityRoleManagerBindDept",
          //     meta: {
          //       title: "绑定部门",
          //       hidden: true,
          //     },
          //     path: "/basic/role/binddept/:id",
          //     component: () =>
          //       import("@/views/authority/role/binddept/index.vue"),
          //     props: true,
          //   },
          //   {
          //     name: "SysAuthorityRoleManagerBindMenu",
          //     meta: {
          //       title: "绑定菜单",
          //       hidden: true,
          //     },
          //     path: "/basic/role/bindmenu/:id",
          //     component: () =>
          //       import("@/views/authority/role/bindmenu/index.vue"),
          //     props: true,
          //   },
          //   {
          //     name: "SysAuthorityRoleManagerBindAuthority",
          //     meta: {
          //       title: "绑定权限",
          //       hidden: true,
          //     },
          //     path: "/basic/role/bindauthority/:id",
          //     component: () =>
          //       import("@/views/authority/role/bindauthority/index.vue"),
          //     props: true,
          //   },
          //   {
          //     name: "SysAuthorityRoleManagerBindClient",
          //     meta: {
          //       title: "绑定客户端",
          //       hidden: true,
          //     },
          //     path: "/basic/role/bindclient/:id",
          //     component: () =>
          //       import("@/views/authority/role/bindclient/index.vue"),
          //     props: true,
          //   },
        ],
      },
      {
        name: "BasicTenant",
        meta: {
          title: "租户管理",
        },
        path: "/basic/tenant",
        component: () => import("@/views/basic/tenant/TenantPage.vue"),
      },
      {
        name: "BasicMenu",
        meta: {
          title: "菜单管理",
        },
        path: "/basic/menu",
        component: () => import("@/views/basic/menu/MenuPage.vue"),
      },
      {
        name: "BasicAuthority",
        meta: {
          title: "权限管理",
        },
        path: "/basic/authority",
        redirect: "/basic/authority/list",
        component: () => import("@/views/basic/authority/AuthorityLayout.vue"),
        children: [
          {
            name: "BasicAuthorityList",
            meta: {
              title: "权限管理",
            },
            path: "/basic/authority/list",
            component: () =>
              import("@/views/basic/authority/AuthorityPage.vue"),
          },
        ],
      },
      {
        name: "BasicClient",
        meta: {
          title: "客户端管理",
        },
        path: "/basic/client",
        redirect: "/basic/client/list",
        component: () => import("@/views/basic/client/ClientLayout.vue"),
        children: [
          {
            name: "BasicClientList",
            meta: {
              title: "客户端管理",
            },
            path: "/basic/client/list",
            component: () => import("@/views/basic/client/ClientPage.vue"),
          },
          //   {
          //     name: "SysAuthorityClientManagerDetail",
          //     meta: {
          //       title: "客户端管理",
          //       hidden: true,
          //     },
          //     path: "/basic/client/:id",
          //     component: () =>
          //       import("@/views/authority/client/manager/index.vue"),
          //     props: true,
          //   },
        ],
      },
    ],
  },
];

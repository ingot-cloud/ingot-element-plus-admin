import type { RouteRecordRaw } from "vue-router";

// 基础管理路由
export const basicRoutes: Array<RouteRecordRaw> = [
  {
    path: "/basic",
    component: () => import("@/components/layout/InAppLayout.vue"),
    redirect: "/basic/user",
    meta: {
      title: "基础管理",
      icon: "ingot:basic",
    },
    children: [
      {
        path: "/basic/user",
        meta: {
          title: "用户管理",
        },
        redirect: "/basic/user/list",
        component: () => import("@/views/basic/user/UserLayout.vue"),
        children: [
          {
            path: "/basic/user/list",
            meta: {
              title: "用户列表",
            },
            component: () => import("@/views/basic/user/home/UserPage.vue"),
          },
          {
            path: "/basic/user/detail/:id",
            meta: {
              title: "用户详情",
              hideMenu: true,
            },
            component: () =>
              import("@/views/basic/user/details/DetailsPage.vue"),
            props: true,
          },
        ],
      },
      {
        path: "/basic/dept",
        meta: {
          title: "部门管理",
        },
        component: () => import("@/views/basic/dept/DeptPage.vue"),
      },
      {
        path: "/basic/role",
        meta: {
          title: "角色管理",
        },
        redirect: "/basic/role/list",
        component: () => import("@/views/basic/role/RoleLayout.vue"),
        children: [
          {
            path: "/basic/role/list",
            meta: {
              title: "角色管理",
            },
            component: () => import("@/views/basic/role/home/RolePage.vue"),
          },
          {
            path: "/basic/role/binddept/:id",
            meta: {
              title: "绑定部门",
              hideMenu: true,
            },
            component: () =>
              import("@/views/basic/role/binddept/IndexPage.vue"),
            props: true,
          },
          {
            path: "/basic/role/bindmenu/:id",
            meta: {
              title: "绑定菜单",
              hideMenu: true,
            },
            component: () =>
              import("@/views/basic/role/bindmenu/IndexPage.vue"),
            props: true,
          },
          {
            path: "/basic/role/bindauthority/:id",
            meta: {
              title: "绑定权限",
              hideMenu: true,
            },
            component: () =>
              import("@/views/basic/role/bindauthority/IndexPage.vue"),
            props: true,
          },
          {
            path: "/basic/role/bindclient/:id",
            meta: {
              title: "绑定客户端",
              hideMenu: true,
            },
            component: () =>
              import("@/views/basic/role/bindclient/IndexPage.vue"),
            props: true,
          },
        ],
      },
      {
        path: "/basic/tenant",
        meta: {
          title: "租户管理",
        },
        component: () => import("@/views/basic/tenant/TenantPage.vue"),
      },
      {
        path: "/basic/menu",
        meta: {
          title: "菜单管理",
        },
        component: () => import("@/views/basic/menu/MenuPage.vue"),
      },
      {
        path: "/basic/authority",
        meta: {
          title: "权限管理",
        },
        redirect: "/basic/authority/list",
        component: () => import("@/views/basic/authority/AuthorityLayout.vue"),
        children: [
          {
            path: "/basic/authority/list",
            meta: {
              title: "权限管理",
            },
            component: () =>
              import("@/views/basic/authority/home/AuthorityPage.vue"),
          },
        ],
      },
      {
        path: "/basic/client",
        meta: {
          title: "客户端管理",
        },
        redirect: "/basic/client/list",
        component: () => import("@/views/basic/client/ClientLayout.vue"),
        children: [
          {
            path: "/basic/client/list",
            meta: {
              title: "客户端列表",
            },
            component: () => import("@/views/basic/client/home/ClientPage.vue"),
          },
          {
            path: "/basic/client/:id",
            meta: {
              title: "编辑客户端",
              hideMenu: true,
            },
            component: () =>
              import("@/views/basic/client/manager/ManagerPage.vue"),
            props: true,
          },
        ],
      },
    ],
  },
];

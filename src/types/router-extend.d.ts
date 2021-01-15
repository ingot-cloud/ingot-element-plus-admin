// Ensure this file is parsed as a module regardless of dependencies.
export {};

declare module "vue-router" {
  interface RouteMeta {
    /**
     * 路由名称
     */
    title?: string;
    /**
     * icon
     */
    icon?: string;
    /**
     * 是否在菜单中隐藏
     */
    hidden?: boolean;
    /**
     * 是否需要进行身份验证
     */
    requiresAuth?: boolean;
  }

  // eslint-disable-next-line @typescript-eslint/class-name-casing
  interface _RouteLocationBase {
    /**
     * 是否终止 NavigationGuard
     */
    terminateGuard?: boolean;
  }
}

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
     * 是否放行，即忽略身份验证
     */
    permitAuth?: boolean;
  }

  // eslint-disable-next-line @typescript-eslint/class-name-casing
  interface _RouteLocationBase {
    /**
     * 跳过之后所有 NavigationGuard 中执行的逻辑
     */
    skipAfterGuard: boolean;
  }
}

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
     * 是否放行，即忽略身份验证
     */
    permitAuth?: boolean;
    /**
     * 是否隐藏菜单
     */
    hideMenu?: boolean;
    /**
     * 隐藏面包屑
     */
    hideBreadcrumb?: boolean;
    /**
     * 是否为固钉
     */
    isAffix?: boolean;
  }

  interface _RouteLocationBase {
    /**
     * 跳过之后所有 NavigationGuard 中执行的逻辑
     */
    skipAfterGuard: boolean;
  }
}

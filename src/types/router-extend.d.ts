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
     * 是否不需要进行身份验证
     */
    permitAuth?: boolean;
  }
}

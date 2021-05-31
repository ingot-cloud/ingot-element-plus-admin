import { App } from "vue";
import { registerCoreComponent } from "@/core/components";

/**
 * 注册组件
 * @param app App
 */
export function registerComponent(app: App) {
  // 注册核心组件
  registerCoreComponent(app);

  // 注册业务组件
}

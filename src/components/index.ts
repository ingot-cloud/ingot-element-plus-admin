import { App } from "vue";
import { registerCoreComponent } from "@/core/component";

/**
 * 注册组件
 * @param app App
 */
export function registerComponent(app: App) {
  registerCoreComponent(app);
}

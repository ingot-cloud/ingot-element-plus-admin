import { App } from "vue";
import IngotAppBar from "./IngotAppBar.vue";

/**
 * 注册组件
 * @param app App
 */
export function registerComponent(app: App) {
  app.component("ingot-app-bar", IngotAppBar);
}

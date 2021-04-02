import { App } from "vue";
import IngotAppBar from "./IngotAppBar.vue";
import IngotSidebarMenu from "./sidebar/IngotSidebarMenu.vue";
import IngotIcon from "./IngotIcon.vue";
import IngotContainer from "./IngotContainer.vue";

/**
 * 注册组件
 * @param app App
 */
export function registerCoreComponent(app: App) {
  app.component("ingot-container", IngotContainer);
  app.component("ingot-app-bar", IngotAppBar);
  app.component("ingot-sidebar-menu", IngotSidebarMenu);
  app.component("ingot-icon", IngotIcon);
}

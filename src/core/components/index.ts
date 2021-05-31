import { App } from "vue";
import IngotAppBar from "./layout/IngotAppBar.vue";
import IngotSidebarMenu from "./layout/sidebar/IngotSidebarMenu.vue";
import IngotIcon from "./Icon/index.vue";
import IngotContainer from "./Container/index.vue";
import IngotPageCard from "./PageCard/index.vue";
import IngotTable from "./Table/index.vue";

/**
 * 注册组件
 * @param app App
 */
export function registerCoreComponent(app: App) {
  app.component("ingot-container", IngotContainer);
  app.component("ingot-app-bar", IngotAppBar);
  app.component("ingot-sidebar-menu", IngotSidebarMenu);
  app.component("ingot-icon", IngotIcon);
  app.component("ingot-page-card", IngotPageCard);
  app.component("ingot-table", IngotTable);
}

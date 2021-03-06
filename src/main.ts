import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";
import theme from "./theme/element-plus";
import "./theme/style/index.styl";
import { registerComponent } from "./components";
import "./icons";

const application = createApp(App);

// 注册组件
registerComponent(application);

application
  .use(store, key)
  .use(router)
  .use(theme)
  .mount("#app");

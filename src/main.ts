import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import theme from "./theme";
import { registerComponent } from "./components";
import "./icons";

const application = createApp(App);

// 注册组件
registerComponent(application);

application
  .use(store)
  .use(router)
  .use(theme)
  .mount("#app");

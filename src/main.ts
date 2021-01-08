import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import theme from "./theme";

createApp(App)
  .use(store)
  .use(router)
  .use(theme)
  .mount("#app");

import app from "./app";
import router from "./router";
import auth from "./auth";
import * as dept from "./dept";

export default {
  app,
  router,
  auth,
  [`${dept.moduleName}`]: dept.module
};

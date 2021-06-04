import app from "./app";
import router from "./router";
import auth from "./auth";
import dept from "./dept";
import { moduleName as DeptName } from "@/store/constants/dept";

export default {
  app,
  router,
  auth,
  [`${DeptName}`]: dept
};

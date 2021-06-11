import app from "./app";
import router from "./router";
import auth from "./auth";
import dept from "./dept";
import role from "./role";
import { moduleName as DeptName } from "@/store/constants/dept";
import { moduleName as RoleName } from "@/store/constants/role";

export default {
  app,
  router,
  auth,
  [`${DeptName}`]: dept,
  [`${RoleName}`]: role
};

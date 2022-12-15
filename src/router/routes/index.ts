import type { RouteRecordRaw } from "vue-router";
import { basicRoutes } from "./basic";
import { securityRoutes } from "./security";
import { commonRoutes } from "./common";

const routes: Array<RouteRecordRaw> = [
  ...commonRoutes,
  ...securityRoutes,
  ...basicRoutes,
];

export default routes;

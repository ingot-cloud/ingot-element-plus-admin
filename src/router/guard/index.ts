import { NavigationGuardWithThis } from "vue-router";
import authRouter from "./authRouter";
import dynamicRouter from "./dynamicRouter";

const guardList: Array<NavigationGuardWithThis<undefined>> = [
  authRouter,
  dynamicRouter
];

export default guardList;

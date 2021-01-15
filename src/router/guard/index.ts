import { NavigationGuardWithThis } from "vue-router";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import dynamicRouter from "./dynamicRouter";

const guardList: Array<NavigationGuardWithThis<undefined>> = [
  authRouter,
  userRouter,
  dynamicRouter
];

export default guardList;

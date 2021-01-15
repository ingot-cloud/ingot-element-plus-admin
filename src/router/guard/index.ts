import { BaseNavigationGuard } from "@/router/types";
import { AuthGuard } from "./authRouter";
import { UserInfoGuard } from "./userRouter";
import { DynamicRouterGuard } from "./dynamicRouter";

const guardList: Array<BaseNavigationGuard> = [
  AuthGuard.get(),
  UserInfoGuard.get(),
  DynamicRouterGuard.get()
];

export default guardList;

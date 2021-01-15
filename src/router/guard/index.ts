import { NavigationGuard } from "@/types";
import { AuthGuard } from "./authRouter";
import { UserInfoGuard } from "./userRouter";
import { DynamicRouterGuard } from "./dynamicRouter";

const guardList: Array<NavigationGuard> = [
  AuthGuard.get(),
  UserInfoGuard.get(),
  DynamicRouterGuard.get()
];

export default guardList;

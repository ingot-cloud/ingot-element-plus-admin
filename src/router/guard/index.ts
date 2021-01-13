import { NavigationGuardWithThis } from "vue-router";
import dynamicRouter from "./dynamicRouter";

const guardList: Array<NavigationGuardWithThis<undefined>> = [dynamicRouter];

export default guardList;

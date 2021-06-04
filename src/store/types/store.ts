import { Store } from "vuex";
import { Theme } from "./cmp";
import { AppModuleState, RouterModuleState, AuthModuleState } from "./core";

/* Ingot Store */
export type IngotStore = Store<AllState>;

/**
 * 全局 state
 */
export interface RootState {
  title: string;
  theme: Theme;
}

/**
 * 所有 state
 */
export interface AllState extends RootState {
  app: AppModuleState;
  router: RouterModuleState;
  auth: AuthModuleState;
}

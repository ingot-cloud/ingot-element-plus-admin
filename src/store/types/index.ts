/* 定义 State 接口 */
export interface AllState extends RootState {
  app: AppModuleState;
}

export interface RootState {
  theme: Theme;
}

export interface AppModuleState {
  sidebar: StateSideBar;
}

/* 定义 State 中使用的类型  */
export type Theme = "Default" | "Dark";

export interface StateSideBar {
  opened?: boolean;
  withoutAnimation?: boolean;
}

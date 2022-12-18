import type { CommonStatus } from "./enums";

export interface MenuTreeNode extends SysMenu {
  children?: Array<MenuTreeNode>;
}

export interface SysMenu {
  id?: string;
  pid?: string;
  name?: string;
  code?: string;
  path?: string;
  viewPath?: string;
  redirect?: string;
  icon?: string;
  sort?: number;
  isCache?: boolean;
  hidden?: boolean;
  params?: string;
  status?: CommonStatus;
  remark?: string;
}

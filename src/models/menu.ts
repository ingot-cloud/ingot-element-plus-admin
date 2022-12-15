import type { CommonStatus } from "./common";

export interface MenuTreeNode extends SysMenu {
  children?: Array<MenuTreeNode>;
}

export interface SysMenu {
  id?: string;
  pid?: string;
  name?: string;
  path?: string;
  viewPath?: string;
  icon?: string;
  sort?: number;
  isCache?: boolean;
  hidden?: boolean;
  params?: string;
  status?: CommonStatus;
  remark?: string;
}

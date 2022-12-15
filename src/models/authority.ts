import type { CommonStatus } from "./common";

export interface AuthorityTreeNode extends SysAuthority {
  children?: Array<AuthorityTreeNode>;
}

export interface SysAuthority {
  id?: string;
  pid?: string;
  name?: string;
  code?: string;
  path?: string;
  method?: string;
  status?: CommonStatus;
  remark?: string;
  createdAt?: string;
}

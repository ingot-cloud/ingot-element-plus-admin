import type { CommonStatus } from "./enums";

export interface AuthorityTreeNode extends SysAuthority {
  children?: Array<AuthorityTreeNode>;
}

export interface SysAuthority {
  id?: string;
  pid?: string;
  name?: string;
  code?: string;
  status?: CommonStatus;
  remark?: string;
  createdAt?: string;
}

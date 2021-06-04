import { DeptTreeNode } from "@/model";

export interface DeptTree {
  props: object;
  nodeKey: string;
  expandedKeys: Array<string>;
  data: Array<DeptTreeNode>;
}

export interface DeptModuleState {
  props: object;
  nodeKey: string;
  expandedKeys: Array<string>;
  data: Array<DeptTreeNode>;
  update: boolean;
}

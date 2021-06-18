import { DeptTreeNode } from "@/model";

export interface DeptTree {
  props: any;
  nodeKey: string;
  expandedKeys: Array<string>;
  data: Array<DeptTreeNode>;
}

export interface DeptModuleState {
  props: any;
  nodeKey: string;
  expandedKeys: Array<string>;
  data: Array<DeptTreeNode>;
  update: boolean;
}

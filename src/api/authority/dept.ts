import request from "@/core/net";
import { DeptTreeNode } from "@/model";

/**
 * 获取部门树结构
 */
export function getDeptTree() {
  return request.get<Array<DeptTreeNode>>("/api/pms/v1/dept/tree");
}

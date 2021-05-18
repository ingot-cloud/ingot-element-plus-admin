import request from "@/core/net";
import { DeptTreeNode, SysDept } from "@/model";

/**
 * 获取部门树结构
 */
export function getDeptTree() {
  return request.get<Array<DeptTreeNode>>({
    url: "/api/pms/v1/dept/tree"
  });
}

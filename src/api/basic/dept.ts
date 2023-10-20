import Http from "@/net";
import type { DeptTreeNode, R } from "@/models";

/**
 * 获取部门树结构
 */
export function DeptOrgTreeAPI(orgId: string): Promise<R<Array<DeptTreeNode>>> {
  return Http.get<Array<DeptTreeNode>>(`/api/pms/v1/admin/dept/tree/${orgId}`);
}

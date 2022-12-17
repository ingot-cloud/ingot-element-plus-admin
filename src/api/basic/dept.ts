import Http from "@/net";
import type { DeptTreeNode, SysDept, R } from "@/models";

/**
 * 获取部门树结构
 */
export function DeptTreeAPI(): Promise<R<Array<DeptTreeNode>>> {
  return Http.get<Array<DeptTreeNode>>("/api/pms/v1/dept/tree");
}

/**
 * 创建部门
 */
export function CreateDeptAPI(params: SysDept): Promise<R<void>> {
  return Http.post("/api/pms/v1/dept", params);
}

/**
 * 更新部门信息
 */
export function UpdateDeptAPI(params: SysDept): Promise<R<void>> {
  return Http.put("/api/pms/v1/dept", params);
}

/**
 * 删除部门
 * @param id 部门id
 */
export function RemoveDeptAPI(id: string): Promise<R<void>> {
  return Http.delete(`/api/pms/v1/dept/${id}`);
}

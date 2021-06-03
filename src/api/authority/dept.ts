import request from "@/net";
import { DeptTreeNode, SysDept } from "@/model";

/**
 * 获取部门树结构
 */
export function getDeptTree() {
  return request.get<Array<DeptTreeNode>>({
    url: "/api/pms/v1/dept/tree"
  });
}

/**
 * 创建部门
 */
export function createDept(params: SysDept) {
  return request.post({
    url: "/api/pms/v1/dept",
    params
  });
}

/**
 * 更新部门信息
 */
export function updateDept(params: SysDept) {
  return request.put({
    url: "/api/pms/v1/dept",
    params
  });
}

/**
 * 删除部门
 * @param id 部门id
 */
export function removeDept(id: string) {
  return request.delete({
    url: `/api/pms/v1/dept/${id}`
  });
}

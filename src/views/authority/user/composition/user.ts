import { reactive, toRaw } from "vue";
import { DeptTreeNode, Page, UserPageItemVo } from "@/model";
import { userPage } from "@/api/authority/user";

const pageInfoRaw: Page<UserPageItemVo> = {
  current: 1,
  size: 20,
  total: 0,
  records: []
};
export const pageInfo = reactive(pageInfoRaw);

function fetchUserData(node: DeptTreeNode) {
  userPage(toRaw(pageInfo), { deptId: node.id }).then(response => {
    pageInfo.records = response.data.records;
    pageInfo.total = Number(response.data.total);
  });
}

/**
 * 处理节点点击事件
 * @param node 部门树节点
 */
export function handleTreeNodeClick(node: DeptTreeNode) {
  fetchUserData(node);
}

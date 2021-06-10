import { reactive, toRaw, ref } from "vue";
import { DeptTreeNode, Page, UserPageItemVo } from "@/model";
import { userPage } from "@/api/authority/user";

interface Condition {
  deptId?: string;
  username?: string;
}

// 条件
export const condition = reactive({} as Condition);
export const currentDeptNode = ref({} as DeptTreeNode);

const pageInfoRaw: Page<UserPageItemVo> = {
  current: 1,
  size: 20,
  total: 0,
  records: []
};
// 页面信息
export const pageInfo = reactive(pageInfoRaw);

/**
 * 获取用户数据
 */
export function fetchUserData() {
  const page = toRaw(pageInfo);
  page.total = undefined;
  page.records = undefined;
  userPage(page, condition).then(response => {
    pageInfo.records = response.data.records;
    pageInfo.total = Number(response.data.total);
  });
}

/**
 * 处理节点点击事件
 * @param node 部门树节点
 */
export function handleTreeNodeClick(node: DeptTreeNode) {
  currentDeptNode.value = node;
  condition.deptId = node.id;
  fetchUserData();
}

/**
 * 创建用户
 */
export function handleCreateUser() {
  //
}

/**
 * 编辑用户
 */
export function handleEditUser() {
  //
}

/**
 * 删除用户
 */
export function handleDeleteUser() {
  //
}

/**
 * 禁用、启用
 */
export function handleDisableUser() {
  //
}

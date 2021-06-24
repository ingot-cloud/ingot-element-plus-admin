import { reactive, toRaw, ref, Ref, unref } from "vue";
import {
  DeptTreeNode,
  Page,
  UserPageItemVo,
  CommonStatus,
  getCommonStatusActionDesc,
} from "@/model";
import { userPage, update, remove } from "@/api/authority/user";
import { Confirm, Message } from "@/utils/message";
import router from "@/router";

interface Condition {
  deptId?: string;
  username?: string;
}

export const loading = ref(false);
export const showDept = ref(true);

// 条件
export const condition = reactive({} as Condition);
export const currentDeptNode = ref({} as DeptTreeNode);

const pageInfoRaw: Page<UserPageItemVo> = {
  current: 1,
  size: 20,
  total: 0,
  records: [],
};
// 页面信息
export const pageInfo = reactive(pageInfoRaw);

/**
 * 获取用户数据
 */
export function fetchUserData(): void {
  const page = toRaw(pageInfo);
  page.total = undefined;
  page.records = undefined;
  const conditionParams = Object.assign({}, condition);
  if (!showDept.value) {
    conditionParams.deptId = undefined;
  }
  userPage(page, conditionParams).then((response) => {
    pageInfo.records = response.data.records;
    pageInfo.total = Number(response.data.total);
  });
}

/**
 * 处理节点点击事件
 * @param node 部门树节点
 */
export function handleTreeNodeClick(node: DeptTreeNode): void {
  currentDeptNode.value = node;
  condition.deptId = node.id;
  fetchUserData();
}

/**
 * 创建用户
 */
export function handleCreateUser(dialogRef: Ref): void {
  const dialog = unref(dialogRef);
  dialog.show();
}

/**
 * 编辑用户
 */
export function handleDetailUser(params: UserPageItemVo): void {
  router.push({
    path: `/authority/user/detail/${params.userId}`,
  });
}

/**
 * 删除用户
 */
export function handleDeleteUser(params: UserPageItemVo): void {
  Confirm.warning(`是否删除用户(${params.username})`).then(() => {
    loading.value = true;
    remove(params.userId)
      .then(() => {
        loading.value = false;
        Message.success("操作成功");
        fetchUserData();
      })
      .catch(() => {
        loading.value = false;
      });
  });
}

/**
 * 禁用、启用
 */
export function handleDisableUser(params: UserPageItemVo): void {
  const status =
    params.status === CommonStatus.Enable
      ? CommonStatus.Lock
      : CommonStatus.Enable;
  const message = `是否${getCommonStatusActionDesc(status)}用户(${
    params.username
  })`;
  Confirm.warning(message).then(() => {
    loading.value = true;
    update({ id: params.userId, status })
      .then(() => {
        loading.value = false;
        Message.success("操作成功");
        fetchUserData();
      })
      .catch(() => {
        loading.value = false;
      });
  });
}

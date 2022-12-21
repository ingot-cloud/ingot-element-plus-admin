import type {
  DeptTreeNode,
  Page,
  PageChangeParams,
  UserPageItemVO,
} from "@/models";
import { CommonStatus, getCommonStatusActionDesc } from "@/models/enums";
import { UserPageAPI, UpdateUserAPI, RemoveUserAPI } from "@/api/basic/user";
import { Confirm, Message } from "@/utils/message";
import { copyParams } from "@/utils/object";
import router from "@/router";

interface Condition {
  deptId?: string;
  username?: string;
}

export const useUserOps = () => {
  const loading = ref<boolean>(false);
  const condition = reactive<Condition>({});
  const currentDeptNode = reactive<DeptTreeNode>({});
  const pageInfo = reactive<Page<UserPageItemVO>>({
    current: 1,
    size: 20,
    total: 0,
    records: [],
  });

  /**
   * 重置过滤条件
   */
  const resetFilter = () => {
    condition.deptId = undefined;
    condition.username = undefined;
    copyParams(currentDeptNode, { name: undefined, id: undefined });
    fetchUserData();
  };

  /**
   * 获取用户数据
   */
  const fetchUserData = (params?: PageChangeParams): void => {
    if (params) {
      pageInfo[params.type] = params.value;
    }
    const page = toRaw(pageInfo);
    page.total = undefined;
    page.records = undefined;
    const conditionParams = Object.assign({}, condition);
    loading.value = true;
    UserPageAPI(page, conditionParams)
      .then((response) => {
        loading.value = false;
        pageInfo.records = response.data.records;
        pageInfo.total = Number(response.data.total);
      })
      .catch(() => {
        loading.value = false;
      });
  };

  /**
   * 处理节点点击事件
   * @param node 部门树节点
   */
  const handleTreeNodeClick = (node: DeptTreeNode): void => {
    copyParams(currentDeptNode, node);
    condition.deptId = node.id;
    fetchUserData();
  };

  /**
   * 编辑用户
   */
  const handleDetailUser = (params: UserPageItemVO): void => {
    router.push({
      path: `/basic/user/detail/${params.userId}`,
    });
  };

  /**
   * 删除用户
   */
  const handleDeleteUser = (params: UserPageItemVO): void => {
    Confirm.warning(`是否删除用户(${params.username})`).then(() => {
      loading.value = true;
      RemoveUserAPI(params.userId)
        .then(() => {
          loading.value = false;
          Message.success("操作成功");
          fetchUserData();
        })
        .catch(() => {
          loading.value = false;
        });
    });
  };

  /**
   * 禁用、启用
   */
  const handleDisableUser = (params: UserPageItemVO): void => {
    const status =
      params.status === CommonStatus.Enable
        ? CommonStatus.Lock
        : CommonStatus.Enable;
    const message = `是否${getCommonStatusActionDesc(status)}用户(${
      params.username
    })`;
    Confirm.warning(message).then(() => {
      loading.value = true;
      UpdateUserAPI({ id: params.userId, status })
        .then(() => {
          loading.value = false;
          Message.success("操作成功");
          fetchUserData();
        })
        .catch(() => {
          loading.value = false;
        });
    });
  };

  return {
    loading,
    condition,
    currentDeptNode,
    pageInfo,
    resetFilter,
    fetchUserData,
    handleTreeNodeClick,
    handleDetailUser,
    handleDeleteUser,
    handleDisableUser,
  };
};

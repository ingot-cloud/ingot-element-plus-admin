<template>
  <UnbindView
    :id="id"
    :title="`${$route.query.name}`"
    :bind-title="`${$route.query.name} - 关联更多权限`"
    :table-headers="tableHeaders"
    :filter-record="filterRecord"
    :bind-single-confirm-message="bindSingleConfirmMessage"
    :bind-batch-confirm-message="bindBatchConfirmMessage"
    :unbind-single-confirm-message="unbindSingleConfirmMessage"
    :unbind-batch-confirm-message="unbindBatchConfirmMessage"
    :fetch-data-fn="fetchDataFn"
    :bind-fn="bindFn"
  ></UnbindView>
</template>
<script lang="ts" setup>
import { GetBindMenusAPI, BindMenuAPI } from "@/api/basic/role";
import { tableHeaders } from "./header";
import type { SysMenu, R, RoleBindParams, MenuTreeNode } from "@/models";
import UnbindView from "../components/UnbindView.vue";

defineProps(["id"]);
const filterRecord = {
  title: "菜单名称",
  key: "name",
  placeholder: "请输入菜单名称",
};
const unbindSingleConfirmMessage = (item: SysMenu) => {
  return `是否解绑菜单:${item.name}`;
};
const bindSingleConfirmMessage = (item: SysMenu) => {
  return `是否绑定菜单:${item.name}`;
};
const unbindBatchConfirmMessage = "是否解绑所选菜单?";
const bindBatchConfirmMessage = "是否绑定所选菜单?";

const fetchDataFn = (
  id: string,
  isBind: boolean,
  condition?: SysMenu
): Promise<R<Array<MenuTreeNode>>> => {
  return GetBindMenusAPI(id, isBind, condition);
};
const bindFn = (bindParams: RoleBindParams): Promise<R<void>> => {
  return BindMenuAPI(bindParams);
};
</script>

<template>
  <UnbindView
    :id="id"
    :title="`${$route.query.name}`"
    :bind-title="`${$route.query.name} - 关联更多部门`"
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
import { GetBindDeptsAPI, BindDeptAPI } from "@/api/basic/role";
import { tableHeaders } from "./header";
import type { SysDept, R, RoleBindParams, DeptTreeNode } from "@/models";
import UnbindView from "../components/UnbindView.vue";

defineProps(["id"]);
const filterRecord = {
  title: "部门名称",
  key: "name",
  placeholder: "请输入部门名称",
};
const unbindSingleConfirmMessage = (item: SysDept) => {
  return `是否解绑部门:${item.name}`;
};
const bindSingleConfirmMessage = (item: SysDept) => {
  return `是否绑定部门:${item.name}`;
};
const unbindBatchConfirmMessage = "是否解绑所选部门?";
const bindBatchConfirmMessage = "是否绑定所选部门?";

const fetchDataFn = (
  id: string,
  isBind: boolean,
  condition?: SysDept
): Promise<R<Array<DeptTreeNode>>> => {
  return GetBindDeptsAPI(id, isBind, condition);
};
const bindFn = (bindParams: RoleBindParams): Promise<R<void>> => {
  return BindDeptAPI(bindParams);
};
</script>

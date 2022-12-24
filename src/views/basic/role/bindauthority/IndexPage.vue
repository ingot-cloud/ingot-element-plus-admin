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
import { GetBindAuthoritiesAPI, BindAuthorityAPI } from "@/api/basic/role";
import { tableHeaders } from "./header";
import type {
  SysAuthority,
  R,
  RoleBindParams,
  AuthorityTreeNode,
} from "@/models";
import UnbindView from "../components/UnbindView.vue";

defineProps(["id"]);
const filterRecord = {
  title: "权限名称",
  key: "name",
  placeholder: "请输入权限名称",
};
const unbindSingleConfirmMessage = (item: SysAuthority) => {
  return `是否解绑权限:${item.name}`;
};
const bindSingleConfirmMessage = (item: SysAuthority) => {
  return `是否绑定权限:${item.name}`;
};
const unbindBatchConfirmMessage = "是否解绑所选权限?";
const bindBatchConfirmMessage = "是否绑定所选权限?";

const fetchDataFn = (
  id: string,
  isBind: boolean,
  condition?: SysAuthority
): Promise<R<Array<AuthorityTreeNode>>> => {
  return GetBindAuthoritiesAPI(id, isBind, condition);
};
const bindFn = (bindParams: RoleBindParams): Promise<R<void>> => {
  return BindAuthorityAPI(bindParams);
};
</script>

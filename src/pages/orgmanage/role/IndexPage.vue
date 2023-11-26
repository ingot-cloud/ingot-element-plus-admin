<template>
  <in-filter-container>
    <template #left>
      <div w-260px>
        <LeftContent @onNodeClick="handleTreeNodeClick" />
      </div>
    </template>

    <UnbindView
      ref="UnbindViewRef"
      :table-headers="tableHeaders"
      :bind-single-confirm-message="bindSingleConfirmMessage"
      :bind-batch-confirm-message="bindBatchConfirmMessage"
      :unbind-single-confirm-message="unbindSingleConfirmMessage"
      :unbind-batch-confirm-message="unbindBatchConfirmMessage"
      :fetch-data-fn="fetchDataFn"
      :bind-fn="bindFn"
    ></UnbindView>
  </in-filter-container>
</template>
<script lang="ts" setup>
import LeftContent from "./components/LeftContent.vue";
import { tableHeaders } from "./table";
import { GetBindAuthoritiesAPI, BindAuthorityAPI } from "@/api/basic/role";
import type {
  SysAuthority,
  R,
  RoleBindParams,
  AuthorityTreeNode,
  RoleGroupItemVO,
} from "@/models";
import UnbindView from "./components/UnbindView.vue";

const id = ref("");
const UnbindViewRef = ref();

const handleTreeNodeClick = (node: RoleGroupItemVO): void => {
  id.value = node.id!;
  UnbindViewRef.value.setCurrentNode(node);
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
<style scoped lang="postcss">
:deep(.in-filter-container-header) {
  padding: 0 !important;
}
.title {
  flex: 1;
  color: #171a1d;
  font-weight: 600;
  font-size: 17px;
}
</style>

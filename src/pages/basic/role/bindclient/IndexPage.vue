<template>
  <UnbindView
    :id="id"
    :title="`${$route.query.name}`"
    :bind-title="`${$route.query.name} - 关联更多客户端`"
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
import { GetBindClientsAPI, BindClientAPI } from "@/api/basic/role";
import { tableHeaders } from "./header";
import type { R, RoleBindParams, OAuth2RegisteredClient } from "@/models";
import UnbindView from "../components/UnbindView.vue";

defineProps(["id"]);
const filterRecord = {
  title: "客户端ID",
  key: "clientId",
  placeholder: "请输入客户端ID",
};
const unbindSingleConfirmMessage = (item: OAuth2RegisteredClient) => {
  return `是否解绑客户端:${item.clientName}`;
};
const bindSingleConfirmMessage = (item: OAuth2RegisteredClient) => {
  return `是否绑定客户端:${item.clientName}`;
};
const unbindBatchConfirmMessage = "是否解绑所选客户端?";
const bindBatchConfirmMessage = "是否绑定所选客户端?";

const fetchDataFn = (
  id: string,
  isBind: boolean,
  condition?: OAuth2RegisteredClient
): Promise<R<Array<OAuth2RegisteredClient>>> => {
  return GetBindClientsAPI(id, isBind, condition);
};
const bindFn = (bindParams: RoleBindParams): Promise<R<void>> => {
  return BindClientAPI(bindParams);
};
</script>

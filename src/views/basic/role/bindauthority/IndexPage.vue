<template>
  <UnbindView
    :id="id"
    :title="`${$route.query.name}`"
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
  Page,
  SysAuthority,
  R,
  RoleBindParams,
  AuthorityTreeNode,
} from "@/models";
import UnbindView from "../components/UnbindView.vue";
import type { ConfirmMessageFn } from "../types";

defineProps(["id"]);
const filterRecord = {
  key: "name",
  placeholder: "权限名称",
};
const unbindSingleConfirmMessage = (item: SysAuthority) => {
  return `是否解绑权限:${item.name}`;
};
const bindSingleConfirmMessage: ConfirmMessageFn<SysAuthority> = (
  item: SysAuthority
) => {
  return `是否绑定权限:${item.name}`;
};
const unbindBatchConfirmMessage = "是否解绑所选权限?";
const bindBatchConfirmMessage = "是否绑定所选权限?";

const fetchDataFn = (
  page: Page,
  id: string,
  isBind: boolean,
  condition?: SysAuthority
): Promise<R<Page<AuthorityTreeNode>>> => {
  return new Promise((resolve, reject) => {
    GetBindAuthoritiesAPI(id, isBind, condition)
      .then((response) => {
        const ret: R<Page<AuthorityTreeNode>> = {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          config: response.config,
          code: response.code,
          message: response.message,
          data: {
            total: response.data.length,
            records: response.data,
          },
        };
        resolve(ret);
      })
      .catch((re) => {
        reject(re);
      });
  });
};
const bindFn = (bindParams: RoleBindParams): Promise<R<void>> => {
  return BindAuthorityAPI(bindParams);
};
</script>

<template>
  <in-table
    ref="bindTable"
    :headers="headers"
    :data="records"
    :selection="editBatch"
    @refresh="refresh"
    @selectionChange="onSelectChanged"
  >
    <template #title> {{ currentNode.name || "请选择角色" }} </template>
    <template #toolbar>
      <in-button
        :disabled="!currentNode.id"
        type="primary"
        @click="showBindMoreView(currentNode)"
      >
        绑定更多
      </in-button>
      <in-button
        :disabled="!currentNode.id"
        type="warning"
        v-if="!editBatch"
        @click="editBatch = true"
      >
        批量解绑
      </in-button>
      <in-button
        v-if="editBatch"
        type="danger"
        :disabled="selectData.length === 0"
        @click="handleBatchUnbind(currentNode.id!)"
      >
        解绑
      </in-button>
      <in-button v-if="editBatch" @click="cancelEditBatch"> 取消 </in-button>
    </template>
    <template #status="{ item }">
      <common-status-tag :status="item.status" />
    </template>
    <template #actions="{ item }">
      <in-button type="danger" @click="handleUnbind(currentNode.id!, item)">
        解绑
      </in-button>
    </template>
  </in-table>
  <BindViewDrawer
    ref="bindView"
    :bindIds="stretch(records)"
    :table-headers="tableHeaders"
    :single-confirm-message="bindSingleConfirmMessage"
    :batch-confirm-message="bindBatchConfirmMessage"
    :fetch-data-fn="fetchDataFn"
    :bind-fn="bindFn"
    @dataChanged="refresh"
  />
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import type { TableHeaderRecord } from "@/components/table";
import type { ConfirmMessageFn, FetchDataFn, BindFn } from "../types";
import { useBind } from "../composables/useBind";
import BindViewDrawer from "./BindViewDrawer.vue";
import type { RoleGroupItemVO } from "@/models";

const currentNode = ref<RoleGroupItemVO>({});

const stretch = (tree: Array<any>): Array<string> => {
  let ids: Array<string> = [];

  tree.forEach((item) => {
    ids.push(item.id as string);
    if (item.children) {
      ids = ids.concat(stretch(item.children));
    }
  });

  return ids;
};

const props = defineProps({
  tableHeaders: {
    type: Object as PropType<Array<TableHeaderRecord>>,
    required: true,
  },
  bindSingleConfirmMessage: {
    type: Function as PropType<ConfirmMessageFn<any>>,
    required: true,
  },
  bindBatchConfirmMessage: {
    type: String,
    required: true,
  },
  unbindSingleConfirmMessage: {
    type: Function as PropType<ConfirmMessageFn<any>>,
    required: true,
  },
  unbindBatchConfirmMessage: {
    type: String,
    required: true,
  },
  fetchDataFn: {
    type: Function as PropType<FetchDataFn<any>>,
    required: true,
  },
  bindFn: {
    type: Function as PropType<BindFn>,
    required: true,
  },
});
const {
  bindTable,
  bindView,
  editBatch,
  headers,
  records,
  selectData,
  fetchData,
  handleUnbind,
  handleBatchUnbind,
  cancelEditBatch,
  onSelectChanged,
  showBindMoreView,
} = useBind({
  tableHeaders: props.tableHeaders,
  singleConfirmMessage: props.unbindSingleConfirmMessage,
  batchConfirmMessage: props.unbindBatchConfirmMessage,
  fetchData: props.fetchDataFn,
  bind: props.bindFn,
});

const refresh = () => {
  if (currentNode.value.id) {
    fetchData(currentNode.value.id!);
  }
};

defineExpose({
  setCurrentNode(node: RoleGroupItemVO) {
    currentNode.value = node;
    fetchData(currentNode.value.id!);
  },
});
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

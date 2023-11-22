<template>
  <in-drawer :title="node.name" v-model="isShow" size="50%">
    <in-table
      ref="bindTable"
      :headers="headers"
      :data="records"
      :selection="editBatch"
      :row-key="TreeListKeyAndProps.key"
      :tree-props="TreeListKeyAndProps.props"
      :selectable="selectable"
      @refresh="fetchData"
      @selectionChange="onSelectChanged"
    >
      <template #toolbar>
        <div v-if="!editBatch">
          <in-button type="primary" @click="editBatch = true">
            批量绑定
          </in-button>
        </div>
        <div v-else>
          <in-button
            type="danger"
            :disabled="selectData.length === 0"
            @click="handleBatchBind"
          >
            绑定
          </in-button>
          <in-button @click="cancelEditBatch"> 取消 </in-button>
        </div>
      </template>
      <template #status="{ item }">
        <common-status-tag :status="item.status" />
      </template>
      <template #actions="{ item }">
        <in-button
          link
          text
          type="primary"
          @click="handleBind(item)"
          :disabled="!selectable(item)"
        >
          <template #icon>
            <i-mdi:relative-scale />
          </template>
          绑定
        </in-button>
      </template>
    </in-table>
  </in-drawer>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import type { TableHeaderRecord } from "@/components/table";
import { TreeListKeyAndProps } from "@/models";
import type { ConfirmMessageFn, FetchDataFn, BindFn } from "../types";
import { useUnbind } from "../composables/useUnbind";

const emits = defineEmits(["dataChanged"]);

const props = defineProps({
  bindIds: {
    type: Array as PropType<Array<string>>,
    required: true,
  },
  tableHeaders: {
    type: Object as PropType<Array<TableHeaderRecord>>,
    required: true,
  },
  singleConfirmMessage: {
    type: Function as PropType<ConfirmMessageFn<any>>,
    required: true,
  },
  batchConfirmMessage: {
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

const selectable = (row: any) => {
  return !props.bindIds.includes(row.id as string);
};

const {
  isShow,
  node,
  bindTable,
  editBatch,
  headers,
  records,
  selectData,
  fetchData,
  handleBind,
  handleBatchBind,
  cancelEditBatch,
  onSelectChanged,
  show,
} = useUnbind({
  tableHeaders: props.tableHeaders,
  singleConfirmMessage: props.singleConfirmMessage,
  batchConfirmMessage: props.batchConfirmMessage,
  fetchData: props.fetchDataFn,
  bind: props.bindFn,
  emit: emits,
});

defineExpose({
  show,
  fetchData,
});
</script>

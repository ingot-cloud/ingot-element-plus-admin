<template>
  <in-page-header @back="$router.back()">
    <template #title>
      {{ title }}
    </template>
    <in-filter-container :show-backtop="false">
      <template #top>
        <in-filter-item>
          <in-with-label :title="filterRecord.title">
            <el-input
              v-model="queryCondition[`${filterRecord.key}`]"
              :placeholder="filterRecord.placeholder"
              clearable
            ></el-input>
          </in-with-label>
          <in-button type="primary" @click="fetchData"> 搜索 </in-button>

          <template #rightActions>
            <in-button type="primary" @click="showBindMoreView">
              绑定更多
            </in-button>
            <in-button
              type="primary"
              v-if="!editBatch"
              @click="editBatch = true"
            >
              批量解绑
            </in-button>
            <in-button
              v-if="editBatch"
              type="danger"
              :disabled="selectData.length === 0"
              @click="handleBatchUnbind"
            >
              解绑
            </in-button>
            <in-button v-if="editBatch" type="warning" @click="cancelEditBatch">
              取消
            </in-button>
          </template>
        </in-filter-item>
      </template>

      <in-table
        ref="bindTable"
        :headers="headers"
        :data="records"
        :selection="editBatch"
        defaultExpandAll
        @refresh="fetchData"
        @handleSizeChange="fetchData"
        @handleCurrentChange="fetchData"
        @selectionChange="onSelectChanged"
      >
        <template #status="{ item }">
          <common-status-tag :status="item.status" />
        </template>
        <template #actions="{ item }">
          <in-button type="danger" @click="handleUnbind(item)">
            解绑
          </in-button>
        </template>
      </in-table>
    </in-filter-container>
  </in-page-header>

  <BindViewDrawer
    ref="bindView"
    :id="id"
    :bindIds="stretch(records)"
    :title="bindTitle"
    :table-headers="tableHeaders"
    :filter-record="filterRecord"
    :single-confirm-message="bindSingleConfirmMessage"
    :batch-confirm-message="bindBatchConfirmMessage"
    :fetch-data-fn="fetchDataFn"
    :bind-fn="bindFn"
    @dataChanged="fetchData"
  />
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import type { TableHeaderRecord } from "@/components/table";
import type {
  FilterRecord,
  ConfirmMessageFn,
  FetchDataFn,
  BindFn,
} from "../types";
import { useBind } from "../composables/useBind";
import BindViewDrawer from "./BindViewDrawer.vue";

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
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  bindTitle: {
    type: String,
    required: true,
  },
  tableHeaders: {
    type: Object as PropType<Array<TableHeaderRecord>>,
    required: true,
  },
  filterRecord: {
    type: Object as PropType<FilterRecord>,
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
  queryCondition,
  fetchData,
  handleUnbind,
  handleBatchUnbind,
  cancelEditBatch,
  onSelectChanged,
  showBindMoreView,
} = useBind({
  id: props.id,
  tableHeaders: props.tableHeaders,
  singleConfirmMessage: props.unbindSingleConfirmMessage,
  batchConfirmMessage: props.unbindBatchConfirmMessage,
  fetchData: props.fetchDataFn,
  bind: props.bindFn,
});

defineExpose({
  fetchData,
});
</script>

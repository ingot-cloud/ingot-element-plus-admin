<template>
  <el-drawer
    :title="title"
    v-model="isShow"
    direction="ltr"
    :modal="false"
    size="70%"
  >
    <in-filter-container :showBacktop="false">
      <template #top>
        <in-filter-item>
          <in-with-label :title="filterRecord.title">
            <el-input
              clearable
              v-model="queryCondition[`${filterRecord.key}`]"
              :placeholder="filterRecord.placeholder"
            ></el-input>
          </in-with-label>
          <in-button type="primary" @click="fetchData"> 搜索 </in-button>
          <template #rightActions>
            <div v-if="!editBatch">
              <in-button @click="editBatch = true"> 批量绑定 </in-button>
            </div>
            <div v-else>
              <in-button
                type="danger"
                :disabled="selectData.length === 0"
                @click="handleBatchBind"
              >
                绑定
              </in-button>
              <in-button type="warning" @click="cancelEditBatch">
                取消
              </in-button>
            </div>
          </template>
        </in-filter-item>
      </template>
      <in-table
        ref="bindTable"
        :headers="headers"
        :data="records"
        :selection="editBatch"
        :row-key="TreeListKeyAndProps.key"
        :tree-props="TreeListKeyAndProps.props"
        :selectable="selectable"
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
    </in-filter-container>
  </el-drawer>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import type { TableHeaderRecord } from "@/components/table";
import { TreeListKeyAndProps } from "@/models";
import type {
  FilterRecord,
  ConfirmMessageFn,
  FetchDataFn,
  BindFn,
} from "../types";
import { useUnbind } from "../composables/useUnbind";

const emits = defineEmits(["dataChanged"]);

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  bindIds: {
    type: Array as PropType<Array<string>>,
    required: true,
  },
  title: {
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
  bindTable,
  editBatch,
  headers,
  records,
  selectData,
  queryCondition,
  fetchData,
  handleBind,
  handleBatchBind,
  cancelEditBatch,
  onSelectChanged,
  show,
} = useUnbind({
  id: props.id,
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

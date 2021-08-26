<template>
  <ingot-filter-container>
    <template #title>
      <slot name="filter-title"> </slot>
    </template>
    <slot name="filter"> </slot>
  </ingot-filter-container>
  <el-table
    size="small"
    :border="true"
    ref="ingotTable"
    :data="data"
    @select-all="privateOnTableSelectAll"
    @select="privateOnTableSelect"
    @selection-change="privateOnTableSelectionChange"
    :default-expand-all="defaultExpandAll"
    :expand-row-keys="expandRowKeys"
    :tree-props="treeProps"
    :row-key="rowKey"
    :header-cell-style="headerCellStyle"
  >
    <el-table-column
      v-if="selection"
      width="50"
      align="center"
      type="selection"
    />

    <el-table-column
      v-for="item in headersEnable"
      :key="item.prop"
      :label="item.label"
      :type="item.type || undefined"
      :width="item.width || undefined"
      :fixed="item.fixed || undefined"
      :align="item.align || 'left'"
    >
      <template #="scope" v-if="!item.type">
        <slot :name="item.prop" :item="scope.row" :index="scope.$index">
          {{ scope.row[item.prop] }}
        </slot>
      </template>
    </el-table-column>
  </el-table>
  <div v-if="page && page.total > 0" class="pagination-container">
    <el-pagination
      :current-page="current"
      :page-size="size"
      :total="total"
      :page-sizes="pageSize"
      background
      size="small"
      :layout="pageLayout"
      @size-change="privateHandleSizeChange"
      @current-change="privateHandleCurrentChange"
    />
  </div>
  <el-drawer
    title="编辑列"
    v-model="headerDrawer"
    direction="rtl"
    :modal="false"
    :size="600"
  >
    <div class="table-header-drawer">
      <el-transfer
        v-model="headersEnableValue"
        :data="headers"
        :props="headerTransferProps"
        :titles="headerTransferTitles"
        @change="privateOnHeaderChanged"
      />
    </div>
  </el-drawer>
</template>
<script lang="ts">
export interface API {
  clearSelection(): void;
  editHeader(): void;
}
</script>
<script lang="ts" setup>
import {
  defineProps,
  defineEmits,
  defineExpose,
  PropType,
  ref,
  watch,
  unref,
} from "vue";
import type { HeaderItem, Page } from "./type";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  headers: {
    type: Object as PropType<Array<HeaderItem>>,
    default: () => null,
  },
  page: {
    type: Object as PropType<Page>,
    default() {
      return {
        current: 1,
        size: 20,
        total: 0,
      };
    },
  },
  pageSize: {
    type: Array,
    default() {
      return [20, 30, 40, 50];
    },
  },
  pageLayout: {
    type: String,
    default() {
      return "total, sizes, prev, pager, next, jumper";
    },
  },
  selection: {
    type: Boolean,
    default: false,
  },
  rowKey: {
    type: [String, Function] as PropType<string | ((row: any) => string)>,
  },
  defaultExpandAll: {
    type: Boolean,
    default: false,
  },
  expandRowKeys: {
    type: Array,
    default() {
      return undefined;
    },
  },
  treeProps: {
    type: Object,
    default() {
      return { hasChildren: "hasChildren", children: "children" };
    },
  },
  headerCellStyle: {
    type: Object,
    default() {
      return {
        background: "#fafafa",
        color: "black",
      };
    },
  },
});

const emits = defineEmits([
  "handleSizeChange",
  "handleCurrentChange",
  "select",
  "selectAll",
  "selectionChange",
]);

const page = props.page;

const headerDrawer = ref(false);
const headersEnable = ref(
  props.headers.filter((item: HeaderItem) => !item.hide) as Array<HeaderItem>
);
const headersEnableValue = ref(headersEnable.value.map((item) => item.prop));
const headerTransferProps = { label: "label", key: "prop" };
const headerTransferTitles = ["可选项", "显示项"];

watch(
  () => props.page.size,
  (value) => {
    size.value = value;
  }
);
watch(
  () => props.page.total,
  (value) => {
    total.value = value;
  }
);

const current = page.current;
const size = ref(page.size);
const total = ref(page.total);

const ingotTable = ref();

const privateHandleSizeChange = (val: number) => {
  emits("handleSizeChange", { value: val, type: "size" });
};

const privateHandleCurrentChange = (val: number) => {
  emits("handleCurrentChange", { value: val, type: "current" });
};
const privateOnTableSelect = (selection: any) => {
  emits("select", selection);
};
const privateOnTableSelectAll = (selection: any, row: any) => {
  emits("selectAll", selection, row);
};

const privateOnTableSelectionChange = (selection: any) => {
  emits("selectionChange", selection);
};
const privateOnHeaderChanged = (value: any) => {
  headersEnable.value = props.headers.filter((item: HeaderItem) =>
    value.includes(item.prop)
  );
};
/**
 * 用于多选表格，清空用户的选择
 */
const clearSelection = () => {
  const table = unref(ingotTable);
  table.clearSelection();
};
const editHeader = () => {
  headerDrawer.value = true;
};

defineExpose({
  clearSelection,
  editHeader,
});
</script>
<style lang="stylus" scoped>
.pagination-container
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
.table-header-drawer
  display flex
  flex-direction column
  align-items center
</style>

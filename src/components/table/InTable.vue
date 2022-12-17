<template>
  <div flex flex-row justify-between m-b-5px p-5px>
    <div>
      <slot name="title"> </slot>
    </div>
    <div flex justify-center items-center>
      <div flex justify-center items-center gap-1 m-r-5px>
        <slot name="toolbar"></slot>
      </div>

      <el-divider direction="vertical" />

      <div flex justify-center items-center gap-1>
        <el-tooltip content="刷新" effect="light" placement="top">
          <i-ep:refresh-right @click="privateOnRefreshClick" />
        </el-tooltip>
        <el-tooltip content="设置" effect="light" placement="top">
          <i-ep:setting
            ref="settingButtonRef"
            v-click-outside="privateOnSettingClickOutside"
          />
        </el-tooltip>
        <el-popover
          ref="settingPopoverRef"
          trigger="click"
          placement="bottom"
          :width="600"
          :virtual-ref="settingButtonRef"
          virtual-triggering
        >
          <div flex flex-col items-center>
            <el-transfer
              v-model="headersEnableValue"
              :data="headers"
              :props="headerTransferProps"
              :titles="headerTransferTitles"
              @change="privateOnHeaderChanged"
            />
          </div>
        </el-popover>
      </div>
    </div>
  </div>

  <el-table
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
  >
    <el-table-column
      v-if="selection"
      :width="selectionProps.width"
      :align="selectionProps.align"
      :selectable="selectable"
      type="selection"
    />
    <el-table-column
      v-if="index"
      :width="indexProps.width"
      :align="indexProps.align"
      :label="indexProps.label"
      type="index"
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
      <template v-slot="scope" v-if="!item.type">
        <slot :name="item.prop" :item="scope.row" :index="scope.$index">
          {{ scope.row[String(item.prop)] }}
        </slot>
      </template>
    </el-table-column>
  </el-table>
  <div
    v-if="page && page.total > 0"
    m-t-20px
    flex
    flex-row
    justify-end
    items-start
  >
    <el-pagination
      :small="componentSize === 'small'"
      :current-page="current"
      :page-size="size"
      :total="total"
      :page-sizes="pageSize"
      background
      :layout="pageLayout"
      @size-change="privateHandleSizeChange"
      @current-change="privateHandleCurrentChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, defineExpose, ref, watch, unref } from "vue";
import { ClickOutside as vClickOutside } from "element-plus";
import type { PropType } from "vue";
import type { HeaderItem, Page } from "./types";
import { useAppStateStore } from "@/stores/modules/app";
import { storeToRefs } from "pinia";
const { componentSize } = storeToRefs(useAppStateStore());

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
  selectionProps: {
    type: Object as PropType<HeaderItem>,
    default() {
      return {
        align: "center",
        width: "50",
      };
    },
  },
  selectable: {
    type: Function as PropType<(row: any, index: number) => boolean>,
  },
  index: {
    type: Boolean,
    default: false,
  },
  indexProps: {
    type: Object as PropType<HeaderItem>,
    default() {
      return {
        label: "序号",
        align: "center",
        width: "50",
      };
    },
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
  "refresh",
]);

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

const headersEnable = ref(
  props.headers.filter((item: HeaderItem) => !item.hide) as Array<HeaderItem>
);
const headersEnableValue = ref(headersEnable.value.map((item) => item.prop));
const headerTransferProps = { label: "label", key: "prop" };
const headerTransferTitles = ["可选项", "显示项"];

const settingPopoverRef = ref();
const settingButtonRef = ref();
const current = ref(props.page.current);
const size = ref(props.page.size);
const total = ref(props.page.total);
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
const privateOnRefreshClick = () => {
  emits("refresh");
};
const privateOnSettingClickOutside = () => {
  unref(settingPopoverRef).popperRef?.delayHide?.();
};

/**
 * 用于多选表格，清空用户的选择
 */
const clearSelection = () => {
  const table = unref(ingotTable);
  table.clearSelection();
};

defineExpose({
  clearSelection,
});
</script>

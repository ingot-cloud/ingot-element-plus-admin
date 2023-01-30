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
          <in-refresh-icon size="22" @refresh="privateOnRefreshClick" />
        </el-tooltip>
        <el-tooltip content="设置" effect="light" placement="top">
          <in-column-setting
            size="22"
            :data="props.headers"
            @onSelectionChange="privateOnHeaderChanged"
          />
        </el-tooltip>
      </div>
    </div>
  </div>

  <el-radio-group v-if="radioKey" v-model="radioValue" w-full>
    <el-table
      :border="true"
      v-loading="loading"
      ref="ingotTable"
      :data="data"
      :stripe="stripe"
      @select-all="privateOnTableSelectAll"
      @select="privateOnTableSelect"
      @selection-change="privateOnTableSelectionChange"
      @row-click="privateRowClick"
      :highlight-current-row="highlightCurrentRow"
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
            {{
              item.transform
                ? item.transform(scope.row[String(item.prop)])
                : scope.row[String(item.prop)]
            }}
          </slot>
        </template>
      </el-table-column>
    </el-table>
  </el-radio-group>
  <el-table
    v-else
    :border="true"
    v-loading="loading"
    ref="ingotTable"
    :data="data"
    :stripe="stripe"
    @select-all="privateOnTableSelectAll"
    @select="privateOnTableSelect"
    @selection-change="privateOnTableSelectionChange"
    @row-click="privateRowClick"
    :highlight-current-row="highlightCurrentRow"
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
          {{
            item.transform
              ? item.transform(scope.row[String(item.prop)])
              : scope.row[String(item.prop)]
          }}
        </slot>
      </template>
    </el-table-column>
  </el-table>
  <div v-if="page && page.total" m-t-20px flex flex-row justify-end items-start>
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
import type { TableHeaderRecord } from "./types";
import { tableProps } from "./props";
import { useAppStateStore } from "@/stores/modules/app";

const props = defineProps(tableProps);
const emits = defineEmits([
  "handleSizeChange",
  "handleCurrentChange",
  "select",
  "selectAll",
  "selectionChange",
  "refresh",
  "rowClick",
]);
const { componentSize } = storeToRefs(useAppStateStore());

watch(
  () => props.page.size,
  (value) => {
    size.value = value;
  }
);
watch(
  () => props.page.current,
  (value) => {
    current.value = value;
  }
);
watch(
  () => props.page.total,
  (value) => {
    total.value = value;
  }
);

const headersEnable = ref(
  props.headers.filter(
    (item: TableHeaderRecord) => !item.hide
  ) as Array<TableHeaderRecord>
);

const current = ref(props.page.current);
const size = ref(props.page.size);
const total = ref(props.page.total);
const ingotTable = ref();
const radioValue = ref();

const privateRowClick = (item: any) => {
  if (props.radioKey) {
    radioValue.value = item[props.radioKey];
  }
  emits("rowClick", item);
};

const privateHandleSizeChange = (val: number) => {
  emits("handleSizeChange", { value: val, type: "size" });
};

const privateHandleCurrentChange = (val: number) => {
  emits("handleCurrentChange", { value: val, type: "current" });
};
const privateOnTableSelect = (selection: any, row: any) => {
  emits("select", selection, row);
};
const privateOnTableSelectAll = (selection: any) => {
  emits("selectAll", selection);
};
const privateOnTableSelectionChange = (selection: any) => {
  emits("selectionChange", selection);
};
const privateOnHeaderChanged = (value: Array<String>) => {
  headersEnable.value = props.headers.filter((item: TableHeaderRecord) =>
    value.includes(item.prop as string)
  );
};
const privateOnRefreshClick = () => {
  emits("refresh");
};

defineExpose({
  /**
   * 用于多选表格，清空用户的选择
   */
  clearSelection: () => {
    const table = unref(ingotTable);
    table.clearSelection();
  },
  toggleRowSelection: (row: any, selected?: boolean) => {
    const table = unref(ingotTable);
    table.toggleRowSelection(row, selected);
  },
});
</script>

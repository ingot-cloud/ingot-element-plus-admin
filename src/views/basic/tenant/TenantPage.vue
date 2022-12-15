<template>
  <in-container>
    <in-table
      :data="tenantOps.pageInfo.records"
      :page="tenantOps.pageInfo"
      ref="tableRef"
      :headers="tableHeaders"
    >
      <template #filter>
        <el-input
          v-model="tenantOps.condition.name"
          class="item"
          size="small"
          clearable
          style="width: 200px"
          placeholder="租户名称"
        ></el-input>
        <el-button
          class="item"
          size="small"
          type="primary"
          @click="refreshData"
        >
          搜索
        </el-button>
        <el-button
          class="item"
          size="small"
          type="success"
          @click="handleCreate"
        >
          添加
        </el-button>
        <el-button size="small" @click="editTableColumn" class="item">
          自定义列
        </el-button>
      </template>
      <template #status="{ item }">
        <el-tag :type="getCommonStatusTag(item.status)">
          {{ getCommonStatusDesc(item.status) }}
        </el-tag>
      </template>
      <template #actions="{ item }">
        <el-button size="mini" type="primary" @click="handleEdit(item)">
          编辑
        </el-button>
        <el-button
          size="mini"
          :type="getDisableButtonParams(item.status).type"
          @click="tenantOps.handleDisable(item, refreshData)"
        >
          {{ getDisableButtonParams(item.status).title }}
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="tenantOps.handleDelete(item, refreshData)"
        >
          删除
        </el-button>
      </template>
    </in-table>
  </in-container>

  <EditDialog ref="editDialog" @success="refreshData" />
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
  getCommonStatusDesc,
  getCommonStatusTag,
  getDisableButtonParams,
} from "@/models";
import type { SysTenant } from "@/models";
import { tableHeaders } from "./table";
import { useTenantOps } from "./composables/useTenantOps";
import EditDialog from "./component/EditDialog.vue";
import type { API as EditDialogAPI } from "./component/EditDialog.vue";
import type { API as TableAPI } from "@/components/table/types";

const editDialog = ref<EditDialogAPI>();
const tableRef = ref<TableAPI>();
const tenantOps = useTenantOps();

const refreshData = () => {
  tenantOps.fetchData();
};

const handleCreate = (): void => {
  editDialog.value?.show();
};

const handleEdit = (params: SysTenant): void => {
  editDialog.value?.show(params);
};

/**
 * 编辑表格显示列
 */
const editTableColumn = () => {
  tableRef.value?.editHeader();
};

onMounted(() => {
  refreshData();
});
</script>

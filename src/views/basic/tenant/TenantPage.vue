<template>
  <in-container>
    <in-table
      :data="tenantOps.pageInfo.records"
      :page="tenantOps.pageInfo"
      ref="tableRef"
      :headers="tableHeaders"
      @refresh="refreshData"
    >
      <template #title>
        <el-input
          v-model="tenantOps.condition.name"
          class="item"
          clearable
          style="width: 200px"
          placeholder="租户名称"
        ></el-input>
      </template>
      <template #toolbar>
        <in-button type="primary" @click="tenantOps.condition.name = undefined">
          重置
        </in-button>
        <in-button type="primary" @click="refreshData"> 搜索 </in-button>
        <in-button type="primary" @click="handleCreate"> 新增 </in-button>
      </template>
      <template #status="{ item }">
        <common-status-tag :status="item.status"></common-status-tag>
      </template>
      <template #actions="{ item }">
        <in-button type="primary" text link @click="handleEdit(item)">
          <template #icon>
            <i-ep:edit />
          </template>
          编辑
        </in-button>
        <common-status-button
          :status="item.status"
          text
          link
          @click="tenantOps.handleDisable(item, refreshData)"
        ></common-status-button>
        <in-button
          type="danger"
          text
          link
          @click="tenantOps.handleDelete(item, refreshData)"
        >
          <template #icon>
            <i-ep:delete />
          </template>
          删除
        </in-button>
      </template>
    </in-table>
  </in-container>

  <EditDialog ref="editDialog" @success="refreshData" />
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
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

onMounted(() => {
  refreshData();
});
</script>

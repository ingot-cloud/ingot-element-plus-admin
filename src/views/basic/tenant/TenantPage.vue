<template>
  <in-filter-container>
    <template #top>
      <in-filter-item>
        <in-with-label title="租户名称">
          <el-input
            v-model="tenantOps.condition.name"
            class="item"
            clearable
            style="width: 200px"
            placeholder="请输入租户名称"
          ></el-input>
        </in-with-label>
        <template #rightActions>
          <in-button @click="tenantOps.condition.name = undefined">
            重置
          </in-button>
          <in-button
            type="primary"
            @in-click="refreshData"
            :loading="tenantOps.loading.value"
          >
            搜索
          </in-button>
        </template>
      </in-filter-item>
    </template>
    <in-table
      :loading="tenantOps.loading.value"
      :data="tenantOps.pageInfo.records"
      :page="tenantOps.pageInfo"
      ref="tableRef"
      :headers="tableHeaders"
      @handleSizeChange="tenantOps.fetchData"
      @handleCurrentChange="tenantOps.fetchData"
      @refresh="refreshData"
    >
      <template #toolbar>
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
  </in-filter-container>

  <EditDialog ref="editDialog" @success="refreshData" />
</template>
<script lang="ts" setup>
import type { SysTenant } from "@/models";
import { tableHeaders } from "./table";
import { useTenantOps } from "./composables/useTenantOps";
import EditDialog from "./components/EditDialog.vue";
import type { API as EditDialogAPI } from "./components/EditDialog.vue";
import type { TableAPI } from "@/components/table";

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

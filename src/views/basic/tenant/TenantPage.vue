<template>
  <in-filter-container>
    <template #top>
      <in-filter-item>
        <in-with-label title="租户名称">
          <el-input
            v-model="paging.condition.name"
            class="item"
            clearable
            style="width: 200px"
            placeholder="请输入租户名称"
          ></el-input>
        </in-with-label>
        <template #rightActions>
          <in-button @click="paging.condition.name = undefined">
            重置
          </in-button>
          <in-button
            type="primary"
            @in-click="refreshData"
            :loading="paging.loading.value"
          >
            搜索
          </in-button>
        </template>
      </in-filter-item>
    </template>
    <in-table
      :loading="paging.loading.value"
      :data="paging.pageInfo.records"
      :page="paging.pageInfo"
      ref="tableRef"
      :headers="tableHeaders"
      @handleSizeChange="paging.exec"
      @handleCurrentChange="paging.exec"
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
          @click="
            confirmStatus.exec(item.id, item.status, `租户(${item.name})`)
          "
        ></common-status-button>
        <in-button
          type="danger"
          text
          link
          @click="confirmDelete.exec(item.id, `是否删除租户(${item.name})`)"
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
import EditDialog from "./components/EditDialog.vue";
import type { API as EditDialogAPI } from "./components/EditDialog.vue";
import type { TableAPI } from "@/components/table";
import { useTenantStore } from "@/stores/modules/tenant";

const editDialog = ref<EditDialogAPI>();
const tableRef = ref<TableAPI>();

const tenantStore = useTenantStore();
const paging = usePaging(transformPageAPI(tenantStore.fetchTenantPage));
const confirmStatus = useConfirmStatus(tenantStore.updateTenant, paging.exec);
const confirmDelete = useConfirmDelete(tenantStore.removeTenant, paging.exec);

const refreshData = () => {
  paging.exec();
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

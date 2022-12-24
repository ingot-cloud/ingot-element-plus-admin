<template>
  <in-filter-container>
    <template #top>
      <in-filter-item>
        <in-with-label title="角色名">
          <el-input
            v-model="roleOps.condition.name"
            clearable
            style="width: 200px"
            placeholder="请输入角色名"
          ></el-input>
        </in-with-label>
        <template #rightActions>
          <in-button @click="roleOps.condition.name = undefined">
            重置
          </in-button>
          <in-button
            type="primary"
            @in-click="refreshData"
            :loading="roleOps.loading.value"
          >
            搜索
          </in-button>
        </template>
      </in-filter-item>
    </template>
    <in-table
      :loading="roleOps.loading.value"
      :data="roleOps.pageInfo.records"
      :page="roleOps.pageInfo"
      ref="tableRef"
      :headers="tableHeaders"
      @handleSizeChange="roleOps.fetchData"
      @handleCurrentChange="roleOps.fetchData"
      @refresh="refreshData"
    >
      <template #title> </template>
      <template #toolbar>
        <in-button type="primary" @click="handleCreate"> 添加 </in-button>
      </template>
      <template #status="{ item }">
        <common-status-tag :status="item.status"></common-status-tag>
      </template>
      <template #actions="{ item }">
        <in-button text link type="primary" @click="handleEdit(item)">
          <template #icon>
            <i-ep:edit />
          </template>
          编辑
        </in-button>
        <common-status-button
          :status="item.status"
          :disabled="!item.canAction"
          text
          link
          @click="roleOps.handleDisable(item, refreshData)"
        >
        </common-status-button>
        <in-button
          text
          link
          type="danger"
          @click="roleOps.handleDelete(item, refreshData)"
          :disabled="!item.canAction"
        >
          <template #icon>
            <i-ep:delete />
          </template>
          删除
        </in-button>
        <el-dropdown @command="roleOps.handleBindCommand" m-l-10px>
          <in-button>
            <template #icon>
              <i-material-symbols:expand-more-rounded />
            </template>
            更多
          </in-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :command="{ data: item, type: 'binddept' }">
                关联部门
              </el-dropdown-item>
              <el-dropdown-item
                :command="{ data: item, type: 'bindauthority' }"
              >
                关联权限
              </el-dropdown-item>
              <el-dropdown-item :command="{ data: item, type: 'bindclient' }">
                关联客户端
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </in-table>

    <EditDialog ref="editDialog" @success="refreshData" />
  </in-filter-container>
</template>
<script lang="ts" setup>
import { tableHeaders } from "./table";
import type { RolePageItemVO } from "@/models";
import { useRoleOps } from "./useRoleOps";
import EditDialog from "./EditDialog.vue";
import type { API as EditDialogAPI } from "./EditDialog.vue";
import type { TableAPI } from "@/components/table";

const roleOps = useRoleOps();
const editDialog = ref<EditDialogAPI>();
const tableRef = ref<TableAPI>();

const refreshData = () => {
  roleOps.fetchData();
};

const handleCreate = (): void => {
  editDialog.value?.show();
};

const handleEdit = (params: RolePageItemVO): void => {
  editDialog.value?.show(params);
};

onMounted(() => {
  refreshData();
});
</script>

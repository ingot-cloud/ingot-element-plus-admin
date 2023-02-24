<template>
  <in-filter-container>
    <template #left>
      <div w-300px>
        <DeptFilter @onNodeClick="userOps.handleTreeNodeClick" />
      </div>
    </template>

    <template #top>
      <in-filter-item>
        <in-with-label title="用户名">
          <el-input
            v-model="userOps.condition.username"
            clearable
            style="width: 200px"
            placeholder="请输入用户名"
          ></el-input>
        </in-with-label>

        <template #rightActions>
          <in-button @click="userOps.resetFilter"> 重置 </in-button>
          <in-button
            type="primary"
            :loading="userOps.loading.value"
            @click="userOps.fetchUserData"
          >
            搜索
          </in-button>
        </template>
      </in-filter-item>
    </template>

    <in-table
      :loading="userOps.loading.value"
      :data="userOps.pageInfo.records"
      :headers="tableHeaders"
      :page="userOps.pageInfo"
      ref="tableRef"
      @refresh="userOps.fetchUserData"
      @handleSizeChange="userOps.fetchUserData"
      @handleCurrentChange="userOps.fetchUserData"
    >
      <template #title> {{ userOps.currentDeptNode.name }} </template>
      <template #toolbar>
        <in-button type="primary" @click="handleCreateUser"> 添加 </in-button>
      </template>
      <template #status="{ item }">
        <common-status-tag :status="item.status" />
      </template>
      <template #actions="{ item }">
        <in-button
          link
          text
          type="primary"
          @click="userOps.handleDetailUser(item)"
        >
          <template #icon>
            <i-mdi:card-account-details-outline />
          </template>
          详情
        </in-button>
        <common-status-button
          text
          link
          :status="item.status"
          @click="userOps.handleDisableUser(item)"
        />
        <in-button
          link
          text
          type="danger"
          @click="userOps.handleDeleteUser(item)"
        >
          <template #icon>
            <i-ep:delete />
          </template>
          删除
        </in-button>
      </template>
    </in-table>
  </in-filter-container>

  <CreateDialog
    ref="createDialog"
    :deptName="userOps.currentDeptNode.name"
    :deptId="userOps.currentDeptNode.id"
    :roleList="roleOptions"
    @success="userOps.fetchUserData"
  />
</template>

<script lang="ts" setup>
import { useRoleStore } from "@/stores/modules/role";
import { useUserOps } from "./useUserOps";
import { tableHeaders } from "./table";
import DeptFilter from "./DeptFilter.vue";
import CreateDialog from "./CreateDialog.vue";
import type { API as CreateDialogAPI } from "./CreateDialog.vue";
import type { TableAPI } from "@/components/table";

const userOps = useUserOps();
const roleStore = useRoleStore();
const { roleOptions } = storeToRefs(roleStore);

const createDialog = ref<CreateDialogAPI>();
const tableRef = ref<TableAPI>();

const handleCreateUser = (): void => {
  createDialog.value?.show();
};

onMounted(() => {
  roleStore.fetchRoleOptions();
  userOps.fetchUserData();
});
</script>

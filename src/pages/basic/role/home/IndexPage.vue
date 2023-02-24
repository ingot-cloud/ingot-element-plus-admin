<template>
  <in-filter-container>
    <template #top>
      <in-filter-item>
        <in-with-label title="角色名">
          <el-input
            v-model="paging.condition.name"
            clearable
            style="width: 200px"
            placeholder="请输入角色名"
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
          @click="
            confirmStatus.exec(item.id, item.status, `角色(${item.name})`)
          "
        >
        </common-status-button>
        <in-button
          text
          link
          type="danger"
          @click="confirmDelete.exec(item.id, `是否删除角色(${item.name})`)"
          :disabled="!item.canAction"
        >
          <template #icon>
            <i-ep:delete />
          </template>
          删除
        </in-button>
        <el-dropdown @command="handleBindCommand" m-l-10px>
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
import EditDialog from "./EditDialog.vue";
import type { API as EditDialogAPI } from "./EditDialog.vue";
import type { TableAPI } from "@/components/table";
import { useRoleStore } from "@/stores/modules/role";
import router from "@/router";

const editDialog = ref<EditDialogAPI>();
const tableRef = ref<TableAPI>();

const roleStore = useRoleStore();
const paging = usePaging(transformPageAPI(roleStore.fetchRolePage));
const confirmStatus = useConfirmStatus(roleStore.updateRole, paging.exec);
const confirmDelete = useConfirmDelete(roleStore.removeRole, paging.exec);

const refreshData = () => {
  paging.exec();
};

const handleCreate = (): void => {
  editDialog.value?.show();
};

const handleEdit = (params: RolePageItemVO): void => {
  editDialog.value?.show(params);
};

const handleBindCommand = (params: {
  type: string;
  data: RolePageItemVO;
}): void => {
  const type = params.type;
  const data = params.data;
  const roleId = data.id;

  router.push({
    path: `/basic/role/${type}/${roleId}`,
    query: {
      name: data.name,
    },
  });
};

onMounted(() => {
  refreshData();
});
</script>

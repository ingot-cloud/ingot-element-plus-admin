<template>
  <in-container>
    <in-table
      :data="roleOps.pageInfo.records"
      :page="roleOps.pageInfo"
      ref="tableRef"
      :headers="tableHeaders"
      @handleSizeChange="roleOps.fetchData"
      @handleCurrentChange="roleOps.fetchData"
      @refresh="refreshData"
    >
      <template #title>
        <el-input
          v-model="roleOps.condition.name"
          clearable
          style="width: 200px"
          placeholder="角色名"
        ></el-input>
      </template>
      <template #toolbar>
        <in-button type="primary" @click="roleOps.condition.name = undefined">
          重置
        </in-button>
        <in-button type="primary" @click="refreshData"> 搜索 </in-button>
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
              <el-dropdown-item :command="{ data: item, type: 'binduser' }">
                关联用户
              </el-dropdown-item>
              <el-dropdown-item :command="{ data: item, type: 'binddept' }">
                关联部门
              </el-dropdown-item>
              <el-dropdown-item
                divided
                :command="{ data: item, type: 'bindmenu' }"
              >
                关联菜单
              </el-dropdown-item>
              <el-dropdown-item
                :command="{ data: item, type: 'bindauthority' }"
              >
                关联权限
              </el-dropdown-item>
              <el-dropdown-item
                divided
                :command="{ data: item, type: 'bindclient' }"
              >
                关联客户端
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </in-table>

    <EditDialog ref="editDialog" @success="refreshData" />
  </in-container>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { tableHeaders } from "./table";
import type { RolePageItemVO } from "@/models";
import { useRoleOps } from "./useRoleOps";
import EditDialog from "./EditDialog.vue";
import type { API as EditDialogAPI } from "./EditDialog.vue";
import type { TableAPI } from "@/models/components";

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

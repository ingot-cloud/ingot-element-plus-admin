<template>
  <in-container>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-tree
          :data="deptTree"
          :props="TreeKeyAndProps.props"
          :node-key="TreeKeyAndProps.nodeKey"
          :default-expanded-keys="expandedKeys"
          :highlight-current="true"
          :expand-on-click-node="false"
          @node-click="userOps.handleTreeNodeClick"
        ></el-tree>
      </el-col>
      <el-col :span="20">
        <in-table
          :data="userOps.pageInfo.records"
          :headers="tableHeaders"
          :page="userOps.pageInfo"
          ref="tableRef"
          @handleSizeChange="userOps.fetchUserData"
          @handleCurrentChange="userOps.fetchUserData"
        >
          <template #title> 部门：{{ userOps.currentDeptNode.name }} </template>
          <template #toolbar>
            <el-input
              v-model="userOps.condition.username"
              clearable
              style="width: 200px"
              placeholder="用户名"
            ></el-input>
            <in-button type="primary" @click="userOps.fetchUserData">
              搜索
            </in-button>
            <in-button type="primary" @click="handleCreateUser">
              添加
            </in-button>
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
      </el-col>
    </el-row>
  </in-container>

  <CreateDialog
    ref="createDialog"
    :deptName="userOps.currentDeptNode.name"
    :deptId="userOps.currentDeptNode.id"
    :roleList="roleOptions"
    @success="userOps.fetchUserData"
  />
</template>

<script lang="ts" setup>
import { TreeKeyAndProps } from "@/models";
import { useDeptStore } from "@/stores/modules/dept";
import { useRoleStore } from "@/stores/modules/role";
import { useUserOps } from "./useUserOps";
import { tableHeaders } from "./table";
import CreateDialog from "./CreateDialog.vue";
import type { API as CreateDialogAPI } from "./CreateDialog.vue";
import type { TableAPI } from "@/components/table";

const userOps = useUserOps();
const deptStore = useDeptStore();
const roleStore = useRoleStore();
const { deptTree, expandedKeys } = storeToRefs(deptStore);
const { roleOptions } = storeToRefs(roleStore);

const createDialog = ref<CreateDialogAPI>();
const tableRef = ref<TableAPI>();

/**
 * 创建用户
 */
const handleCreateUser = (): void => {
  createDialog.value?.show();
};

onMounted(() => {
  deptStore.fetchDeptTree().then((data) => {
    userOps.handleTreeNodeClick(data[0]);
  });
  roleStore.fetchRoleOptions();
});
</script>

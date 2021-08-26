<template>
  <ingot-container>
    <ingot-page-card :hideBack="true">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-switch
            v-model="showDept"
            active-text="部门过滤"
            @change="fetchUserData"
          ></el-switch>
          <el-tree
            v-if="showDept"
            :data="deptTree.data"
            :props="deptTree.props"
            :node-key="deptTree.nodeKey"
            :default-expanded-keys="deptTree.expandedKeys"
            :highlight-current="true"
            :expand-on-click-node="false"
            @node-click="handleTreeNodeClick"
          ></el-tree>
        </el-col>
        <el-col :span="20">
          <ingot-table
            :data="pageInfo.records"
            :headers="tableHeaders"
            :page="pageInfo"
            @handleSizeChange="fetchUserData"
            @handleCurrentChange="fetchUserData"
          >
            <template #filter-title v-if="showDept">
              部门：{{ currentDeptNode.name }}
            </template>
            <template #filter>
              <el-input
                v-model="condition.username"
                class="item"
                size="small"
                clearable
                style="width: 200px"
                placeholder="用户名"
              ></el-input>
              <el-button
                class="item"
                size="small"
                type="primary"
                @click="fetchUserData"
              >
                搜索
              </el-button>
              <el-button
                class="item"
                size="small"
                type="success"
                @click="handleCreateUser"
              >
                添加
              </el-button>
            </template>
            <template #status="{ item }">
              <el-tag :type="getCommonStatusTag(item.status)">
                {{ getCommonStatusDesc(item.status) }}
              </el-tag>
            </template>
            <template #actions="{ item }">
              <el-button
                size="mini"
                type="primary"
                @click="handleDetailUser(item)"
              >
                详情
              </el-button>
              <el-button
                size="mini"
                :type="getDisableButtonParams(item.status).type"
                @click="handleDisableUser(item)"
              >
                {{ getDisableButtonParams(item.status).title }}
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteUser(item)"
              >
                删除
              </el-button>
            </template>
          </ingot-table>
        </el-col>
      </el-row>
    </ingot-page-card>
  </ingot-container>

  <CreateDialog
    ref="createDialog"
    :deptName="currentDeptNode.name"
    :deptId="currentDeptNode.id"
    :roleList="roleRecords"
    @success="fetchUserData"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { fetchDeptTree, computedDeptTreeData } from "@/store/composition/dept";
import {
  fetchCacheData as fetchRoleData,
  computedRecords as computedRoleRecords,
} from "@/store/composition/role";
import {
  showDept,
  condition,
  pageInfo,
  fetchUserData,
  handleTreeNodeClick,
  handleDetailUser,
  handleDeleteUser,
  handleDisableUser,
  currentDeptNode,
} from "./biz/user";
import { tableHeaders } from "./biz/table";
import {
  getCommonStatusDesc,
  getCommonStatusTag,
  getDisableButtonParams,
} from "@/model";
import { useStore } from "@/store";
import CreateDialog from "./component/CreateDialog.vue";
import type { API as CreateDialogAPI } from "./component/CreateDialog.vue";

const createDialog = ref<CreateDialogAPI>();
const deptTree = computedDeptTreeData();
const roleRecords = computedRoleRecords();
const store = useStore();

/**
 * 创建用户
 */
const handleCreateUser = (): void => {
  createDialog.value?.show();
};

onMounted(() => {
  fetchDeptTree(store).then((data) => {
    handleTreeNodeClick(data[0]);
  });
  fetchRoleData(store);
});
</script>

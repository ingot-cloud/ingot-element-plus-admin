<template>
  <ingot-container>
    <ingot-page-card @back="$router.back()" :content="title">
      <ingot-table
        :headers="headers"
        :data="bindPageInfo.records"
        :row-key="treeData.key"
        :tree-props="treeData.props"
        :selection="editBatch"
        :index="!editBatch"
        ref="bindTable"
        @handleSizeChange="fetchData"
        @handleCurrentChange="fetchData"
        @selectionChange="onSelectChanged"
      >
        <template #filter-title>
          <el-input
            class="item"
            size="small"
            clearable
            style="width: 200px"
            v-model="queryCondition.name"
            placeholder="菜单名称"
          ></el-input>
          <el-button
            size="small"
            type="primary"
            class="item"
            @click="fetchData"
          >
            搜索
          </el-button>
        </template>
        <template #filter>
          <el-button size="small" @click="showBindMoreView">
            绑定更多
          </el-button>
          <el-button size="small" @click="editTableColumn" class="item">
            自定义列
          </el-button>
          <div v-if="!editBatch" class="item">
            <el-button size="small" @click="editBatch = true">
              批量解绑
            </el-button>
          </div>
          <div v-else class="item">
            <el-button
              size="small"
              type="danger"
              class="item"
              :disabled="selectData.length === 0"
              @click="handleBatchUnbind"
            >
              解绑
            </el-button>
            <el-button size="small" type="warning" @click="cancelEditBatch">
              取消
            </el-button>
          </div>
        </template>
        <template #scope="{ item }">
          {{ getDeptRoleScopeDesc(item.scope) }}
        </template>
        <template #status="{ item }">
          <ingot-common-status-tag :status="item.status" />
        </template>
        <template #actions="{ item }">
          <el-button size="mini" type="danger" @click="handleUnbind(item)">
            解绑
          </el-button>
        </template>
      </ingot-table>
    </ingot-page-card>
  </ingot-container>
  <BindView
    ref="bindView"
    :id="id"
    :bindArray="bindPageInfo.records"
    @dataChanged="fetchData"
  />
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
import { useRoute } from "vue-router";
import { getBindMenus, bindMenu } from "@/api/authority/role";
import { tableHeaders } from "./header";
import {
  Page,
  SysMenu,
  IngotResponse,
  RoleBindParams,
  getDeptRoleScopeDesc,
  MenuTreeNode,
} from "@/model";
import BindView from "./BindView.vue";
import { bindSetup } from "@/views/authority/role/common/bind";

const props = defineProps(["id"]);
const route = useRoute();
const treeData = {
  props: { children: "children", hasChildren: "hasChildren" },
  key: "id",
};
const {
  title,
  bindTable,
  bindView,
  editBatch,
  headers,
  bindPageInfo,
  selectData,
  queryCondition,
  fetchData,
  handleUnbind,
  handleBatchUnbind,
  cancelEditBatch,
  editTableColumn,
  onSelectChanged,
  showBindMoreView,
} = bindSetup({
  title: `角色：${route.query.name}`,
  id: props.id,
  tableHeaders,
  singleConfirmMessage(item: SysMenu) {
    return `是否解绑菜单:${item.name}`;
  },
  batchConfirmMessage: "是否解绑所选菜单?",
  fetchData(
    page: Page,
    id: string,
    isBind: boolean,
    condition?: SysMenu
  ): Promise<IngotResponse<Page<MenuTreeNode>>> {
    return new Promise((resolve, reject) => {
      getBindMenus(id, isBind, condition)
        .then((response) => {
          resolve({
            code: response.code,
            message: response.message,
            data: {
              total: response.data.length,
              records: response.data,
            },
            headers: response.headers,
          });
        })
        .catch((re) => {
          reject(re);
        });
    });
  },
  bind(bindParams: RoleBindParams): Promise<IngotResponse<void>> {
    return bindMenu(bindParams);
  },
});
</script>

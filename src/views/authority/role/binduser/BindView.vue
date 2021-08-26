<template>
  <el-drawer
    :title="title"
    v-model="isShow"
    direction="ltr"
    :modal="false"
    size="70%"
  >
    <ingot-container>
      <ingot-table
        :headers="headers"
        :data="bindPageInfo.records"
        :page="bindPageInfo"
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
            v-model="queryCondition.username"
            placeholder="用户名"
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
          <div v-if="!editBatch" class="item">
            <el-button size="small" @click="editBatch = true">
              批量绑定
            </el-button>
          </div>
          <div v-else class="item">
            <el-button
              size="small"
              type="danger"
              class="item"
              :disabled="selectData.length === 0"
              @click="handleBatchBind"
            >
              绑定
            </el-button>
            <el-button size="small" type="warning" @click="cancelEditBatch">
              取消
            </el-button>
          </div>
        </template>
        <template #status="{ item }">
          <ingot-common-status-tag :status="item.status" />
        </template>
        <template #actions="{ item }">
          <el-button size="mini" type="success" @click="handleBind(item)">
            绑定
          </el-button>
        </template>
      </ingot-table>
    </ingot-container>
  </el-drawer>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, defineExpose } from "vue";
import { useRoute } from "vue-router";
import { getBindUsers, bindUser } from "@/api/authority/role";
import { tableHeaders } from "./header";
import { Page, SysUser, IngotResponse, RoleBindParams } from "@/model";
import { unbindSetup } from "@/views/authority/role/common/bind";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const emits = defineEmits(["dataChanged"]);
const route = useRoute();
const {
  title,
  isShow,
  bindTable,
  editBatch,
  headers,
  bindPageInfo,
  selectData,
  queryCondition,
  fetchData,
  handleBind,
  handleBatchBind,
  cancelEditBatch,
  onSelectChanged,
  show,
} = unbindSetup({
  title: `角色：${route.query.name} - 关联更多用户`,
  id: props.id,
  tableHeaders,
  singleConfirmMessage(item: SysUser) {
    return `是否绑定用户:${item.username}`;
  },
  batchConfirmMessage: "是否绑定所选用户?",
  fetchData(
    page: Page,
    id: string,
    isBind: boolean,
    condition?: SysUser
  ): Promise<IngotResponse<Page<SysUser>>> {
    return getBindUsers(page, id, isBind, condition);
  },
  bind(bindParams: RoleBindParams): Promise<IngotResponse<void>> {
    return bindUser(bindParams);
  },
  emit: emits,
});

defineExpose({
  show,
  fetchData,
});
</script>

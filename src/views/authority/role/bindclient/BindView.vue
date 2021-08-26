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
            v-model="queryCondition.clientId"
            placeholder="clientId"
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
import { getBindClients, bindClient } from "@/api/authority/role";
import { tableHeaders } from "./header";
import {
  Page,
  SysOauthClientDetails,
  IngotResponse,
  RoleBindParams,
} from "@/model";
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
  title: `角色：${route.query.name} - 关联更多客户端`,
  id: props.id,
  tableHeaders,
  singleConfirmMessage(item: SysOauthClientDetails) {
    return `是否绑定客户端:${item.clientId}`;
  },
  batchConfirmMessage: "是否绑定所选客户端?",
  fetchData(
    page: Page,
    id: string,
    isBind: boolean,
    condition?: SysOauthClientDetails
  ): Promise<IngotResponse<Page<SysOauthClientDetails>>> {
    return getBindClients(page, id, isBind, condition);
  },
  bind(bindParams: RoleBindParams): Promise<IngotResponse<void>> {
    return bindClient(bindParams);
  },
  emit: emits,
});

defineExpose({
  show,
  fetchData,
});
</script>

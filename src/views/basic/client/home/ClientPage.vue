<template>
  <in-filter-container>
    <template #top>
      <div flex flex-row justify-between>
        <in-with-label title="客户端ID">
          <el-input
            v-model="clientOps.condition.clientId"
            clearable
            style="width: 180px"
            placeholder="请输入客户端ID"
          ></el-input>
        </in-with-label>
        <div>
          <in-button @click="clientOps.condition.clientId = undefined">
            重置
          </in-button>
          <in-button
            type="primary"
            :loading="clientOps.loading.value"
            @in-click="clientOps.fetchData"
          >
            搜索
          </in-button>
        </div>
      </div>
    </template>
    <in-table
      :loading="clientOps.loading.value"
      :data="clientOps.pageInfo.records"
      :headers="tableHeaders"
      :page="clientOps.pageInfo"
      ref="tableRef"
      stripe
      @handleSizeChange="clientOps.fetchData"
      @handleCurrentChange="clientOps.fetchData"
      @refresh="clientOps.fetchData"
    >
      <template #toolbar>
        <in-button type="primary" @click="handleCreate()"> 添加 </in-button>
      </template>
      <template #authorizationGrantTypes="{ item }">
        <el-tag
          style="margin: 1px"
          v-for="grant in stringToArray(item.authorizationGrantTypes)"
          :key="grant"
        >
          {{ grant }}
        </el-tag>
      </template>
      <template #scopes="{ item }">
        <el-tag
          style="margin: 1px"
          v-for="scope in stringToArray(item.scopes)"
          :key="scope"
        >
          {{ scope }}
        </el-tag>
      </template>
      <template #tokenAuthType="{ item }">
        <el-tag :type="getTokenAuthMethodTag(item.tokenAuthType)">
          {{ getTokenAuthMethodLabel(item.tokenAuthType) }}
        </el-tag>
      </template>
      <template #status="{ item }">
        <common-status-tag :status="item.status" />
      </template>
      <template #actions="{ item }">
        <in-button
          type="primary"
          text
          link
          @click="clientOps.handleManager(item)"
        >
          <template #icon>
            <i-material-symbols:vpn-key-outline-rounded />
          </template>
          管理
        </in-button>
        <common-status-button
          text
          link
          :status="item.status"
          @click="clientOps.handleDisable(item, clientOps.fetchData)"
        />
        <in-button
          text
          link
          type="danger"
          @click="clientOps.handleDelete(item, clientOps.fetchData)"
        >
          <template #icon>
            <i-ep:delete />
          </template>
          删除
        </in-button>
      </template>
    </in-table>
  </in-filter-container>
  <CreateDialog ref="createDialogRef" @success="clientOps.fetchData" />
</template>
<script lang="ts" setup>
import { tableHeaders } from "./table";
import { getTokenAuthMethodTag, getTokenAuthMethodLabel } from "@/models/enums";
import { useClientOps } from "./useClientOps";
import CreateDialog from "./CreateDialog.vue";
import type { API as CreateDialogAPI } from "./CreateDialog.vue";
import type { TableAPI } from "@/components/table";

onMounted(() => {
  clientOps.fetchData();
});

const clientOps = useClientOps();
const createDialogRef = ref<CreateDialogAPI>();
const tableRef = ref<TableAPI>();

const handleCreate = (): void => {
  createDialogRef.value?.show();
};

const stringToArray = (target: string, split = ",") => {
  if (!target) {
    return [];
  }
  const arr = target.split(split);
  if (!arr || arr.length === 0) {
    return null;
  }
  return arr;
};
</script>

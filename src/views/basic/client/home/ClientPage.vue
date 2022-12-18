<template>
  <in-container>
    <in-table
      :data="clientOps.pageInfo.records"
      :headers="tableHeaders"
      :page="clientOps.pageInfo"
      ref="tableRef"
      @handleSizeChange="clientOps.fetchData"
      @handleCurrentChange="clientOps.fetchData"
      @refresh="clientOps.fetchData"
    >
      <template #title>
        <el-input
          v-model="clientOps.condition.clientId"
          clearable
          style="width: 200px"
          placeholder="客户端ID"
        ></el-input>
      </template>
      <template #toolbar>
        <el-button type="primary" @click="clientOps.fetchData">
          搜索
        </el-button>
        <el-button type="primary" @click="handleCreate()"> 添加 </el-button>
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
  </in-container>
  <CreateDialog ref="createDialogRef" @success="clientOps.fetchData" />
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { tableHeaders } from "./table";
import { getTokenAuthMethodTag, getTokenAuthMethodLabel } from "@/models/enums";
import { useClientOps } from "./useClientOps";
import CreateDialog from "./CreateDialog.vue";
import type { API as CreateDialogAPI } from "./CreateDialog.vue";
import type { API as TableAPI } from "@/components/table/types";

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

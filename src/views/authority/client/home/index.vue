<template>
  <ingot-container>
    <ingot-page-card :hideBack="true">
      <ingot-table
        :data="pageInfo.records"
        :headers="tableHeaders"
        :page="pageInfo"
        ref="tableRef"
        @handleSizeChange="fetchData"
        @handleCurrentChange="fetchData"
      >
        <template #filter>
          <el-input
            v-model="condition.clientId"
            class="item"
            size="small"
            clearable
            style="width: 200px"
            placeholder="客户端ID"
          ></el-input>
          <el-button
            class="item"
            size="small"
            type="primary"
            @click="fetchData"
          >
            搜索
          </el-button>
          <el-button
            class="item"
            size="small"
            type="success"
            @click="handleCreate()"
          >
            添加
          </el-button>
          <el-button size="small" @click="editTableColumn" class="item">
            自定义列
          </el-button>
        </template>

        <template #authorizedGrantTypes="{ item }">
          <el-tag
            style="margin: 1px"
            v-for="grant in grantTypeList(item.authorizedGrantTypes)"
            :key="grant"
          >
            {{ grant }}
          </el-tag>
        </template>

        <template #status="{ item }">
          <el-tag :type="getCommonStatusTag(item.status)">
            {{ getCommonStatusDesc(item.status) }}
          </el-tag>
        </template>
        <template #actions="{ item }">
          <el-button size="mini" type="primary" @click="handleManager(item)">
            管理
          </el-button>
          <el-button
            size="mini"
            :type="getDisableButtonParams(item.status).type"
            @click="handleDisable(item, fetchData)"
          >
            {{ getDisableButtonParams(item.status).title }}
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(item, fetchData)"
          >
            删除
          </el-button>
        </template>
      </ingot-table>
    </ingot-page-card>
  </ingot-container>
  <CreateDialog ref="createDialogRef" @success="fetchData" />
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { tableHeaders } from "./biz/table";
import {
  getCommonStatusDesc,
  getCommonStatusTag,
  getDisableButtonParams,
} from "@/model/common";
import {
  fetchData,
  handleDelete,
  handleManager,
  handleDisable,
  condition,
  pageInfo,
} from "./biz/client";
import CreateDialog from "./component/CreateDialog.vue";
import type { API as CreateDialogAPI } from "./component/CreateDialog.vue";
import type { API as TableAPI } from "@/components/Table/index.vue";

onMounted(() => {
  fetchData();
});

const createDialogRef = ref<CreateDialogAPI>();
const tableRef = ref<TableAPI>();

/**
 * 编辑表格显示列
 */
const editTableColumn = () => {
  tableRef.value?.editHeader();
};

const handleCreate = (): void => {
  createDialogRef.value?.show();
};

const grantTypeList = (authorizedGrantTypes: string) => {
  if (!authorizedGrantTypes) {
    return [];
  }
  const arr = authorizedGrantTypes.split(",");
  if (!arr || arr.length === 0) {
    return null;
  }
  return arr;
};
</script>

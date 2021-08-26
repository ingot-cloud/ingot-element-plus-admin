<template>
  <ingot-container>
    <ingot-page-card :hideBack="true">
      <ingot-table :data="records" :headers="tableHeaders">
        <template #filter>
          <el-input
            v-model="condition.name"
            class="item"
            size="small"
            clearable
            style="width: 200px"
            placeholder="租户名称"
          ></el-input>
          <el-button
            class="item"
            size="small"
            type="primary"
            @click="refreshData"
          >
            搜索
          </el-button>
          <el-button
            class="item"
            size="small"
            type="success"
            @click="handleCreate"
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
          <el-button size="mini" type="primary" @click="handleEdit(item)">
            编辑
          </el-button>
          <el-button
            size="mini"
            :type="getDisableButtonParams(item.status).type"
            @click="handleDisable(item, refreshData)"
          >
            {{ getDisableButtonParams(item.status).title }}
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(item, refreshData)"
          >
            删除
          </el-button>
        </template>
      </ingot-table>
    </ingot-page-card>
  </ingot-container>

  <EditDialog ref="editDialog" @success="refreshData" />
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { tableHeaders } from "./biz/table";
import { useStore } from "@/store";
import { SysRole, SysTenant } from "@/model";
import {
  getCommonStatusDesc,
  getCommonStatusTag,
  getDisableButtonParams,
} from "@/model/common";
import { handleDelete, handleDisable } from "./biz/tenant";
import { fetchData, computedRecords } from "@/store/composition/tenant";
import EditDialog from "./component/EditDialog.vue";
import type { API as EditDialogAPI } from "./component/EditDialog.vue";

const condition = reactive({} as SysRole);
const store = useStore();
const records = computedRecords();
const editDialog = ref<EditDialogAPI>();

const refreshData = () => {
  fetchData(store, condition);
};

const handleCreate = (): void => {
  editDialog.value?.show();
};

const handleEdit = (params: SysTenant): void => {
  editDialog.value?.show(params);
};

onMounted(() => {
  refreshData();
});
</script>

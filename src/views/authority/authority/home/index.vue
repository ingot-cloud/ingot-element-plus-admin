<template>
  <ingot-container>
    <ingot-page-card :hideBack="true">
      <ingot-table
        :data="pageInfo.records"
        :headers="tableHeaders"
        :page="pageInfo"
        @handleSizeChange="fetchData"
        @handleCurrentChange="fetchData"
      >
        <template #filter>
          <el-input
            v-model="condition.name"
            class="item"
            size="small"
            clearable
            style="width: 200px"
            placeholder="权限名称"
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
            @click="handleCreate"
          >
            添加
          </el-button>
        </template>
        <template #status="{ item }">
          <ingot-common-status-tag :status="item.status" />
        </template>
        <template #actions="{ item }">
          <el-button size="mini" type="primary" @click="handleEdit(item)">
            编辑
          </el-button>
          <el-button size="mini" type="warning" @click="handleChild(item)">
            子权限
          </el-button>
          <ingot-common-status-button
            size="mini"
            :status="item.status"
            @click="handleDisable(item, fetchData)"
          />
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
  <EditDialog ref="editDialogRef" @success="fetchData" />
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { tableHeaders } from "./biz/table";
import { SysAuthority } from "@/model";
import {
  fetchData,
  handleDelete,
  handleDisable,
  handleChild,
  condition,
  pageInfo,
} from "./biz/authority";
import EditDialog from "./component/EditDialog.vue";
import { API as EditDialogAPI } from "./component/EditDialog.vue";

const editDialogRef = ref<EditDialogAPI>();

onMounted(() => {
  fetchData();
});

const handleCreate = (): void => {
  editDialogRef.value?.show();
};

const handleEdit = (params: SysAuthority): void => {
  editDialogRef.value?.show(params);
};
</script>

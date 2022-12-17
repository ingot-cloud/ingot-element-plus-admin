<template>
  <in-container>
    <in-table
      :data="getDeptTreeListData.data"
      :headers="tableHeaders"
      ref="tableRef"
      :row-key="getDeptTreeListData.key"
      :tree-props="getDeptTreeListData.props"
      @refresh="fetchData"
    >
      <template #toolbar>
        <el-button type="success" @click="showEditDialog()"> 添加 </el-button>
      </template>
      <template #scope="{ item }">
        {{ getDeptRoleScopeDesc(item.scope) }}
      </template>
      <template #status="{ item }">
        <common-status-tag :status="item.status" />
      </template>
      <template #actions="{ item }">
        <in-button type="success" @click="showEditDialog(item.id)">
          新增
        </in-button>
        <in-button type="primary" @click="showEditDialog(item)">
          编辑
        </in-button>
        <in-button type="danger" @click="handleDelete(item)"> 删除 </in-button>
      </template>
    </in-table>
  </in-container>
  <EditDialog ref="editDialogRef" :data="selectData" @success="fetchData" />
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { tableHeaders } from "./table";
import { getDeptRoleScopeDesc } from "@/models";
import type { SysDept, DeptTreeNode } from "@/models";
import { Confirm, Message } from "@/utils/message";
import { useDeptStore } from "@/stores/modules/dept";
import { storeToRefs } from "pinia";
import EditDialog from "./components/EditDialog.vue";
import type { API as EditDialogAPI } from "./components/EditDialog.vue";
import type { API as TableAPI } from "@/components/table/types";

const deptStore = useDeptStore();
const editDialogRef = ref<EditDialogAPI>();
const loading = ref(false);
const { getDeptTreeListData } = storeToRefs(deptStore);
const selectData = ref<Array<DeptTreeNode>>([]);
const tableRef = ref<TableAPI>();

onMounted(() => {
  fetchData();
});

const fetchData = () => {
  loading.value = true;
  deptStore
    .fetchDeptTree()
    .then((data) => {
      loading.value = false;
      selectData.value = [
        {
          id: undefined,
          name: "根部门",
          children: data,
        },
      ];
    })
    .catch(() => {
      loading.value = false;
    });
};

const showEditDialog = (params?: SysDept | string) => {
  editDialogRef.value?.show(params);
};

const handleDelete = (params: SysDept) => {
  Confirm.warning(`是否删除部门${params.name}`).then(() => {
    deptStore.removeDept(params.id as string).then(() => {
      Message.success("操作成功");
      fetchData();
    });
  });
};
</script>
<style lang="stylus" scoped></style>

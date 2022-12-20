<template>
  <in-container>
    <in-table
      :data="deptTree"
      :headers="tableHeaders"
      ref="tableRef"
      :row-key="TreeListKeyAndProps.key"
      :tree-props="TreeListKeyAndProps.props"
      @refresh="fetchData"
    >
      <template #toolbar>
        <in-button type="primary" @click="showEditDialog()">
          创建部门
        </in-button>
      </template>
      <template #scope="{ item }">
        {{ getDeptRoleScopeDesc(item.scope) }}
      </template>
      <template #status="{ item }">
        <common-status-tag :status="item.status" />
      </template>
      <template #actions="{ item }">
        <in-button type="primary" text link @click="showEditDialog(item.id)">
          <template #icon>
            <i-carbon:parent-child />
          </template>
          添加子部门
        </in-button>
        <in-button type="primary" text link @click="showEditDialog(item)">
          <template #icon>
            <i-ep:edit />
          </template>
          编辑
        </in-button>
        <in-button type="danger" text link @click="handleDelete(item)">
          <template #icon>
            <i-ep:delete />
          </template>
          删除
        </in-button>
      </template>
    </in-table>
  </in-container>
  <EditDialog
    ref="editDialogRef"
    :selectData="selectData"
    @success="fetchData"
  />
</template>
<script lang="ts" setup>
import { tableHeaders } from "./table";
import { getDeptRoleScopeDesc } from "@/models/enums";
import { RootDept, TreeListKeyAndProps } from "@/models";
import type { SysDept, DeptTreeNode } from "@/models";
import { Confirm, Message } from "@/utils/message";
import { useDeptStore } from "@/stores/modules/dept";
import EditDialog from "./components/EditDialog.vue";
import type { API as EditDialogAPI } from "./components/EditDialog.vue";
import type { TableAPI } from "@/components/table";

const editDialogRef = ref<EditDialogAPI>();
const loading = ref(false);
const selectData = ref<Array<DeptTreeNode>>([]);
const tableRef = ref<TableAPI>();
const deptStore = useDeptStore();
const { deptTree } = storeToRefs(deptStore);

onMounted(() => {
  fetchData();
});

const fetchData = () => {
  loading.value = true;
  deptStore
    .fetchDeptTree()
    .then((data) => {
      loading.value = false;
      selectData.value = [Object.assign(RootDept, { children: data })];
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

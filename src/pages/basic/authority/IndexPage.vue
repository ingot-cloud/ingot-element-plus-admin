<template>
  <in-container>
    <in-table
      :loading="loading"
      :data="treeData"
      :headers="tableHeaders"
      :expandRowKeys="expandedKeys"
      @refresh="fetchData"
      ref="tableRef"
    >
      <template #toolbar>
        <in-button type="primary" @click="handleCreate"> 添加 </in-button>
      </template>
      <template #status="{ item }">
        <common-status-tag :status="item.status" />
      </template>
      <template #actions="{ item }">
        <in-button type="success" text link @click="handleEdit(item.id)">
          <template #icon>
            <i-carbon:parent-child />
          </template>
          添加子权限
        </in-button>
        <in-button type="primary" text link @click="handleEdit(item)">
          <template #icon> <i-ep:edit /> </template>
          编辑
        </in-button>
        <common-status-button
          text
          link
          :status="item.status"
          @click="
            confirmStatus.exec(item.id, item.status, `权限(${item.name})`)
          "
        />
        <in-button
          type="danger"
          text
          link
          @click="confirmDelete.exec(item.id, `是否删除权限(${item.name})`)"
        >
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
import type { SysAuthority, AuthorityTreeNode } from "@/models";
import EditDialog from "./EditDialog.vue";
import type { API as EditDialogAPI } from "./EditDialog.vue";
import type { TableAPI } from "@/components/table";
import { useAuthorityStore } from "@/stores/modules/authority";

onMounted(() => {
  fetchData();
});

const loading = ref(false);
const editDialogRef = ref<EditDialogAPI>();
const tableRef = ref<TableAPI>();
const treeData = ref<Array<AuthorityTreeNode>>([]);
const selectData = ref([] as Array<AuthorityTreeNode>);

const authorityStore = useAuthorityStore();
const { expandedKeys } = storeToRefs(authorityStore);

const fetchData = (): void => {
  loading.value = true;
  authorityStore
    .fetchAuthorityTree()
    .then((data) => {
      loading.value = false;
      treeData.value = data;
      selectData.value = data;
    })
    .catch(() => (loading.value = false));
};

const confirmStatus = useConfirmStatus(
  authorityStore.updateAuthority,
  fetchData
);
const confirmDelete = useConfirmDelete(
  authorityStore.removeAuthority,
  fetchData
);

const handleCreate = (): void => {
  editDialogRef.value?.show();
};

const handleEdit = (params: SysAuthority | string): void => {
  editDialogRef.value?.show(params);
};
</script>

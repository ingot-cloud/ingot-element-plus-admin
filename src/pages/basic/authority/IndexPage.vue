<template>
  <in-container>
    <in-table
      :loading="loading"
      :data="treeData"
      :headers="tableHeaders"
      @refresh="fetchData"
      ref="tableRef"
    >
      <template #title> 权限管理 </template>
      <template #toolbar>
        <in-button type="primary" @click="handleCreate"> 添加权限 </in-button>
      </template>
      <template #code="{ item }">
        <in-copy-tag :text="item.code" />
      </template>
      <template #status="{ item }">
        <common-status-tag :status="item.status" />
      </template>
      <template #type="{ item }">
        <in-tag :value="authorityTypeEnum.getTagText(item.type)" />
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
      </template>
    </in-table>
  </in-container>
  <EditDrawer
    ref="EditDrawerRef"
    :selectData="selectData"
    @success="fetchData"
  />
</template>
<script lang="ts" setup>
import { tableHeaders } from "./table";
import type { SysAuthority, AuthorityTreeNode } from "@/models";
import { useAuthorityTypeEnum } from "@/models/enums";
import EditDrawer from "./EditDrawer.vue";
import type { TableAPI } from "@/components/table";
import { useAuthorityStore } from "@/stores/modules/authority";

onMounted(() => {
  fetchData();
});

const authorityTypeEnum = useAuthorityTypeEnum();
const loading = ref(false);
const EditDrawerRef = ref();
const tableRef = ref<TableAPI>();
const treeData = ref<Array<AuthorityTreeNode>>([]);
const selectData = ref([] as Array<AuthorityTreeNode>);

const authorityStore = useAuthorityStore();

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

const handleCreate = (): void => {
  EditDrawerRef.value?.show();
};

const handleEdit = (params: SysAuthority | string): void => {
  EditDrawerRef.value?.show(params);
};
</script>

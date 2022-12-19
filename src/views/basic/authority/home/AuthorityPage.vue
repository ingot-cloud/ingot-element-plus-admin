<template>
  <in-container>
    <in-table
      :data="treeData"
      :headers="tableHeaders"
      :row-key="TreeListKeyAndProps.key"
      :tree-props="TreeListKeyAndProps.props"
      :expandRowKeys="expandRowKeys"
      @refresh="fetchData"
      ref="tableRef"
    >
      <template #toolbar>
        <in-button type="primary" @click="fetchData"> 搜索 </in-button>
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
          @click="handleDisable(item)"
        />
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
import type { SysAuthority, AuthorityTreeNode } from "@/models";
import { TreeListKeyAndProps } from "@/models";
import { CommonStatus, getCommonStatusActionDesc } from "@/models/enums";
import EditDialog from "./EditDialog.vue";
import type { API as EditDialogAPI } from "./EditDialog.vue";
import type { TableAPI } from "@/models/components";
import {
  GetAuthorityTreeAPI,
  UpdateAuthorityAPI,
  RemoveAuthorityAPI,
} from "@/api/basic/authority";
import { Confirm, Message } from "@/utils/message";

onMounted(() => {
  fetchData();
});

const editDialogRef = ref<EditDialogAPI>();
const tableRef = ref<TableAPI>();
const treeData = ref<Array<AuthorityTreeNode>>([]);
const expandRowKeys = ref<Array<string>>([]);
const selectData = ref([] as Array<AuthorityTreeNode>);

const fetchData = (): void => {
  GetAuthorityTreeAPI().then((response) => {
    const data = response.data;
    treeData.value = data;
    treeData.value.forEach((item) => {
      expandRowKeys.value.push(String(item.id));
    });
    selectData.value = data;
  });
};

const handleDelete = (params: SysAuthority): void => {
  Confirm.warning(`是否删除权限(${params.name})`).then(() => {
    RemoveAuthorityAPI(params.id as string).then(() => {
      Message.success("操作成功");
      fetchData();
    });
  });
};

const handleDisable = (params: SysAuthority): void => {
  const status =
    params.status === CommonStatus.Enable
      ? CommonStatus.Lock
      : CommonStatus.Enable;
  const message = `是否${getCommonStatusActionDesc(status)}权限(${
    params.name
  })`;
  Confirm.warning(message).then(() => {
    UpdateAuthorityAPI({ id: params.id, status }).then(() => {
      Message.success("操作成功");
      fetchData();
    });
  });
};

const handleCreate = (): void => {
  editDialogRef.value?.show();
};

const handleEdit = (params: SysAuthority | string): void => {
  editDialogRef.value?.show(params);
};
</script>

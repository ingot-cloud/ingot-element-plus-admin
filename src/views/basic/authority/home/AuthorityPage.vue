<template>
  <in-container>
    <in-table
      :data="treeData"
      :headers="tableHeaders"
      :row-key="TreeListKeyAndProps.key"
      :tree-props="TreeListKeyAndProps.props"
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
        <in-button type="success" @click="handleEdit(item.id)">
          新增
        </in-button>
        <in-button type="primary" @click="handleEdit(item)"> 编辑 </in-button>
        <common-status-button
          :status="item.status"
          @click="handleDisable(item)"
        />
        <in-button size="mini" type="danger" @click="handleDelete(item)">
          删除
        </in-button>
      </template>
    </in-table>
  </in-container>
  <EditDialog ref="editDialogRef" :data="selectData" @success="fetchData" />
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { tableHeaders } from "./table";
import type { SysAuthority, AuthorityTreeNode } from "@/models";
import { TreeListKeyAndProps } from "@/models";
import { CommonStatus, getCommonStatusActionDesc } from "@/models/enums";
import EditDialog from "./EditDialog.vue";
import type { API as EditDialogAPI } from "./EditDialog.vue";
import type { API as TableAPI } from "@/components/table/types";
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
    selectData.value = [
      {
        id: "0",
        name: "根菜单",
        children: data,
      },
    ];
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

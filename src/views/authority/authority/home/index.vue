<template>
  <ingot-container>
    <ingot-page-card :hideBack="true">
      <ingot-table
        :data="treeData.data"
        :headers="tableHeaders"
        :row-key="treeData.key"
        :tree-props="treeData.props"
        ref="tableRef"
      >
        <template #filter>
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
          <el-button size="small" @click="editTableColumn" class="item">
            自定义列
          </el-button>
        </template>
        <template #status="{ item }">
          <ingot-common-status-tag :status="item.status" />
        </template>
        <template #actions="{ item }">
          <el-button size="mini" type="success" @click="handleEdit(item.id)">
            新增
          </el-button>
          <el-button size="mini" type="primary" @click="handleEdit(item)">
            编辑
          </el-button>
          <ingot-common-status-button
            size="mini"
            :status="item.status"
            @click="handleDisable(item)"
          />
          <el-button size="mini" type="danger" @click="handleDelete(item)">
            删除
          </el-button>
        </template>
      </ingot-table>
    </ingot-page-card>
  </ingot-container>
  <EditDialog ref="editDialogRef" :data="selectData" @success="fetchData" />
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { tableHeaders } from "./table";
import {
  SysAuthority,
  AuthorityTreeNode,
  CommonStatus,
  getCommonStatusActionDesc,
} from "@/model";
import EditDialog from "./component/EditDialog.vue";
import { API as EditDialogAPI } from "./component/EditDialog.vue";
import type { API as TableAPI } from "@/components/Table/index.vue";
import { getAuthorityTree, update, remove } from "@/api/authority/authority";
import { Confirm, Message } from "@/utils/message";

onMounted(() => {
  fetchData();
});

const editDialogRef = ref<EditDialogAPI>();
const tableRef = ref<TableAPI>();
const treeData = reactive({
  props: { children: "children", hasChildren: "hasChildren" },
  key: "id",
  data: [] as Array<AuthorityTreeNode>,
});

const selectData = ref([] as Array<AuthorityTreeNode>);

/**
 * 编辑表格显示列
 */
const editTableColumn = () => {
  tableRef.value?.editHeader();
};

const fetchData = (): void => {
  getAuthorityTree().then((response) => {
    const data = response.data;
    treeData.data = data;
    selectData.value = [
      {
        id: undefined,
        name: "根菜单",
        children: data,
      },
    ];
  });
};

const handleDelete = (params: SysAuthority): void => {
  Confirm.warning(`是否删除权限(${params.name})`).then(() => {
    remove(params.id as string).then(() => {
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
    update({ id: params.id, status }).then(() => {
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

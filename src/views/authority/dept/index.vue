<template>
  <ingot-container>
    <ingot-page-card :hideBack="true">
      <ingot-table
        :data="treeData.data"
        :headers="tableHeaders"
        :row-key="treeData.key"
        :tree-props="treeData.props"
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
            @click="showEditDialog()"
          >
            添加
          </el-button>
        </template>
        <template #icon="{ item }">
          <ingot-icon
            v-if="item.icon"
            :icon="item.icon"
            style="width: 20px; height: 20px"
          />
        </template>
        <template #status="{ item }">
          <ingot-common-status-tag :status="item.status" />
        </template>
        <template #actions="{ item }">
          <el-button
            size="mini"
            type="success"
            @click="showEditDialog(item.id)"
          >
            新增
          </el-button>
          <el-button size="mini" type="primary" @click="showEditDialog(item)">
            编辑
          </el-button>
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
import { onMounted, ref, unref } from "vue";
import { tableHeaders } from "./table";
import { DeptTreeNode, SysDept } from "@/model";
import { useStore } from "@/store";
import {
  computedDeptTreeListData,
  fetchDeptTree,
  removeDept,
} from "@/store/composition/dept";
import { Confirm, Message } from "@/utils/message";
import EditDialog from "./EditDialog.vue";

const store = useStore();
const editDialogRef = ref();
const loading = ref(false);
const treeData = computedDeptTreeListData();
const selectData = ref([] as Array<DeptTreeNode>);

onMounted(() => {
  fetchData();
});

const fetchData = () => {
  loading.value = true;
  fetchDeptTree(store)
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
  const dialog = unref(editDialogRef);
  dialog.show(params);
};

const handleDelete = (params: SysDept) => {
  Confirm.warning(`是否删除部门${params.name}`).then(() => {
    removeDept(store, params.id as string).then(() => {
      Message.success("操作成功");
      fetchData();
    });
  });
};
</script>
<style lang="stylus" scoped></style>

<template>
  <ingot-container>
    <ingot-page-card :hideBack="true">
      <ingot-table
        :data="menuData.data"
        :headers="tableHeaders"
        :row-key="menuData.key"
        :tree-props="menuData.props"
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
import { onMounted, ref, reactive } from "vue";
import { tableHeaders } from "./table";
import { MenuTreeNode, SysMenu } from "@/model";
import { getMenuTree, remove } from "@/api/authority/menu";
import { Confirm, Message } from "@/utils/message";
import EditDialog from "./EditDialog.vue";
import type { API as EditDialogAPI } from "./EditDialog.vue";

const editDialogRef = ref<EditDialogAPI>();
const loading = ref(false);
const menuData = reactive({
  props: { children: "children", hasChildren: "hasChildren" },
  key: "id",
  data: [] as Array<MenuTreeNode>,
});
const selectData = ref([] as Array<MenuTreeNode>);

const fetchData = () => {
  loading.value = true;
  getMenuTree()
    .then((response) => {
      loading.value = false;
      const data = response.data;
      menuData.data = data;
      selectData.value = [
        {
          id: undefined,
          name: "根菜单",
          children: data,
        },
      ];
    })
    .catch(() => {
      loading.value = false;
    });
};

const showEditDialog = (params?: SysMenu | string) => {
  editDialogRef.value?.show(params);
};

function handleDelete(params: SysMenu): void {
  Confirm.warning(`是否删除菜单${params.name}`).then(() => {
    remove(params.id as string).then(() => {
      Message.success("操作成功");
      fetchData();
    });
  });
}

onMounted(() => {
  fetchData();
});
</script>
<style lang="stylus" scoped></style>

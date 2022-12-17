<template>
  <in-container>
    <in-table
      :data="menuData.data"
      :headers="tableHeaders"
      :row-key="menuData.key"
      :tree-props="menuData.props"
      ref="tableRef"
      @refresh="fetchData"
    >
      <template #toolbar>
        <el-button type="primary" @click="fetchData"> 搜索 </el-button>
        <el-button type="primary" @click="showEditDialog()"> 添加 </el-button>
      </template>
      <template #icon="{ item }">
        <in-icon
          v-if="item.icon"
          :name="item.icon"
          class="w-[var(--in-menu-icon-size)] h-[var(--in-menu-icon-size)]"
        />
      </template>
      <template #status="{ item }">
        <common-status-tag :status="item.status" />
      </template>
      <template #actions="{ item }">
        <in-button type="success" @click="showEditDialog(item.id)">
          <template #icon>
            <i-carbon:parent-child />
          </template>
          添加子菜单
        </in-button>
        <in-button type="primary" @click="showEditDialog(item)">
          <template #icon> <i-ep:edit /> </template>
          编辑
        </in-button>
        <in-button type="danger" @click="handleDelete(item)">
          <template #icon>
            <i-ep:delete />
          </template>
          删除
        </in-button>
      </template>
    </in-table>
  </in-container>
  <EditDialog ref="editDialogRef" :data="selectData" @success="fetchData" />
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";
import { tableHeaders } from "./table";
import type { MenuTreeNode, SysMenu } from "@/models";
import { GetMenuTreeAPI, RemoveMenuAPI } from "@/api/basic/menu";
import { Confirm, Message } from "@/utils/message";
import EditDialog from "./EditDialog.vue";
import type { API as EditDialogAPI } from "./EditDialog.vue";
import type { API as TableAPI } from "@/components/table/types";

const editDialogRef = ref<EditDialogAPI>();
const loading = ref(false);
const menuData = reactive({
  props: { children: "children", hasChildren: "hasChildren" },
  key: "id",
  data: [] as Array<MenuTreeNode>,
});
const selectData = ref([] as Array<MenuTreeNode>);
const tableRef = ref<TableAPI>();

const fetchData = () => {
  loading.value = true;
  GetMenuTreeAPI()
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

const handleDelete = (params: SysMenu): void => {
  Confirm.warning(`是否删除菜单${params.name}`).then(() => {
    RemoveMenuAPI(params.id as string).then(() => {
      Message.success("操作成功");
      fetchData();
    });
  });
};

onMounted(() => {
  fetchData();
});
</script>
<style lang="stylus" scoped></style>

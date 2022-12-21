<template>
  <in-container>
    <in-table
      :loading="loading"
      :data="menuData"
      :headers="tableHeaders"
      :row-key="TreeListKeyAndProps.key"
      :tree-props="TreeListKeyAndProps.props"
      :expandRowKeys="expandRowKeys"
      ref="tableRef"
      @refresh="fetchData"
    >
      <template #toolbar>
        <in-button type="primary" @click="showEditDialog()"> 添加 </in-button>
      </template>
      <template #icon="{ item }">
        <in-icon
          v-if="item.icon"
          :name="item.icon"
          class="w-[var(--in-menu-icon-size)] h-[var(--in-menu-icon-size)]"
        />
        <span v-else>-</span>
      </template>
      <template #hidden="{ item }">
        <el-tag :type="item.hidden ? 'danger' : 'success'">
          {{ item.hidden ? "是" : "否" }}
        </el-tag>
      </template>
      <template #hideBreadcrumb="{ item }">
        <el-tag :type="item.hideBreadcrumb ? 'danger' : 'success'">
          {{ item.hideBreadcrumb ? "是" : "否" }}
        </el-tag>
      </template>
      <template #isCache="{ item }">
        <el-tag :type="item.isCache ? 'danger' : 'success'">
          {{ item.isCache ? "是" : "否" }}
        </el-tag>
      </template>
      <template #props="{ item }">
        <el-tag :type="item.props ? 'danger' : 'success'">
          {{ item.props ? "是" : "否" }}
        </el-tag>
      </template>
      <template #status="{ item }">
        <common-status-tag :status="item.status" />
      </template>
      <template #actions="{ item }">
        <in-button type="success" text link @click="showEditDialog(item.id)">
          <template #icon>
            <i-carbon:parent-child />
          </template>
          添加子菜单
        </in-button>
        <in-button type="primary" text link @click="showEditDialog(item)">
          <template #icon> <i-ep:edit /> </template>
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
import type { MenuTreeNode, SysMenu } from "@/models";
import { TreeListKeyAndProps } from "@/models";
import { GetMenuTreeAPI, RemoveMenuAPI } from "@/api/basic/menu";
import { Confirm, Message } from "@/utils/message";
import EditDialog from "./EditDialog.vue";
import type { API as EditDialogAPI } from "./EditDialog.vue";
import type { TableAPI } from "@/components/table";

const editDialogRef = ref<EditDialogAPI>();
const loading = ref(false);
const menuData = ref<Array<MenuTreeNode>>([]);
const expandRowKeys = ref<Array<string>>([]);
const selectData = ref([] as Array<MenuTreeNode>);
const tableRef = ref<TableAPI>();

const fetchData = () => {
  loading.value = true;
  GetMenuTreeAPI()
    .then((response) => {
      loading.value = false;
      const data = response.data;
      menuData.value = data;
      menuData.value.forEach((item) => {
        expandRowKeys.value.push(String(item.id));
      });
      selectData.value = [
        {
          id: "0",
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

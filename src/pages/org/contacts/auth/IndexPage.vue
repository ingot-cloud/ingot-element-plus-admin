<template>
  <in-filter-container>
    <template #header>
      <ContactsTabs select-tab="权限" />
    </template>

    <template #left>
      <div w-260px>
        <LeftContent @onNodeClick="ops.handleTreeNodeClick" />
      </div>
    </template>

    <in-table
      hide-setting
      :loading="ops.loading.value"
      :data="ops.records.value"
      :headers="tableHeaders"
      ref="tableRef"
      @refresh="ops.fetchData"
    >
      <template #title>
        {{ ops.currentNode.name || "请选择角色" }}
      </template>
      <template #toolbar>
        <in-button
          v-if="ops.currentNode.name && !isRoleManager(ops.currentNode.code!)"
          type="primary"
          @click="privateAddAuth"
        >
          添加权限
        </in-button>
      </template>
      <template #code="{ item }">
        <in-copy-tag :text="item.code" />
      </template>
      <template #actions="{ item }">
        <in-button-delete
          v-if="!isRoleManager(ops.currentNode.code!)"
          @click="privateHandleDelete(item)"
        />
      </template>
    </in-table>
  </in-filter-container>

  <AddAuthDrawer
    ref="AddAuthDrawerRef"
    :id="ops.currentNode.id!"
    :bindIds="stretch(ops.records.value)"
    :title="ops.currentNode.name!"
    @success="ops.fetchData"
  />
</template>
<script lang="ts" setup>
import ContactsTabs from "@/pages/org/contacts/components/ContactsTabs.vue";
import LeftContent from "./components/LeftContent.vue";
import { useOps } from "./useOps";
import { tableHeaders } from "./table";
import { BindAuthorityAPI } from "@/api/org/auth";
import AddAuthDrawer from "./components/AddAuthDrawer.vue";
import { isRoleManager } from "@/constants/role";

const AddAuthDrawerRef = ref();

const ops = useOps();
const confirm = useMessageConfirm();

const stretch = (tree: Array<any>): Array<string> => {
  let ids: Array<string> = [];

  tree.forEach((item) => {
    ids.push(item.id as string);
    if (item.children) {
      ids = ids.concat(stretch(item.children));
    }
  });

  return ids;
};

const privateAddAuth = () => {
  AddAuthDrawerRef.value.show();
};
const privateHandleDelete = (item: any) => {
  confirm
    .warning(`角色(${ops.currentNode.name})是否取消绑定权限(${item.name})`)
    .then(() => {
      BindAuthorityAPI({
        id: ops.currentNode.id,
        removeIds: [item.id],
      }).then(() => {
        ops.fetchData();
      });
    });
};
</script>
<style scoped lang="postcss">
:deep(.in-filter-container-header) {
  padding: 0 !important;
}
.title {
  flex: 1;
  color: #171a1d;
  font-weight: 600;
  font-size: 17px;
}
</style>
./useOps

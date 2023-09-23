<template>
  <in-filter-container>
    <template #header>
      <ContactsTabs select-tab="部门" />
    </template>

    <in-table
      :data="deptTree"
      :headers="tableHeaders"
      ref="tableRef"
      :expandRowKeys="expandRowKeys"
      @refresh="fetchData"
    >
      <template #title>
        <div>{{ userInforStore.getCurrentOrg?.name }}</div>
      </template>
      <template #toolbar>
        <in-button type="primary" @click="handleEdit()"> 添加部门 </in-button>
      </template>
      <template #scope="{ item }">
        <el-tag>
          {{ deptRoleScopeEnum.getTagText(item.scope).text }}
        </el-tag>
      </template>
      <template #status="{ item }">
        <common-status-tag :status="item.status" />
      </template>
      <template #actions="{ item }">
        <in-button
          v-if="!item.mainFlag"
          type="primary"
          text
          link
          @click="handleEdit(item.id)"
        >
          <template #icon>
            <i-carbon:parent-child />
          </template>
          添加子部门
        </in-button>
        <in-button
          v-if="!item.mainFlag"
          type="primary"
          text
          link
          @click="handleEdit(item)"
        >
          <template #icon>
            <i-ep:edit />
          </template>
          编辑
        </in-button>
        <in-button
          type="danger"
          text
          link
          v-if="!item.mainFlag"
          @click="confirmDelete.exec(item.id, `是否删除部门(${item.name})`)"
        >
          <template #icon>
            <i-ep:delete />
          </template>
          删除
        </in-button>
        <in-icon v-if="item.mainFlag" name="mingcute:department-line" />
      </template>
    </in-table>
  </in-filter-container>

  <EditDrawer ref="EditDrawerRef" :selectData="deptTree" @success="fetchData" />
</template>
<script lang="ts" setup>
import ContactsTabs from "@/pages/contacts/components/ContactsTabs.vue";
import { tableHeaders } from "./table";
import type { SysDept } from "@/models";
import { useDeptStore } from "@/stores/modules/org/dept";
import { useDeptRoleScopeEnum } from "@/models/enums";
import { useUserInfoStore } from "@/stores/modules/auth";
import EditDrawer from "./components/EditDrawer.vue";

const deptRoleScopeEnum = useDeptRoleScopeEnum();
const loading = ref(false);
const userInforStore = useUserInfoStore();
const deptStore = useDeptStore();
const { deptTree } = storeToRefs(deptStore);
const expandRowKeys = ref<Array<string>>([]);

const EditDrawerRef = ref();

const fetchData = () => {
  loading.value = true;
  deptStore
    .fetchDeptTree()
    .then((data) => {
      loading.value = false;
      if (data && data.length > 0 && expandRowKeys.value.length === 0) {
        expandRowKeys.value = [data[0].id!];
      }
    })
    .catch(() => {
      loading.value = false;
    });
};

const confirmDelete = useConfirmDelete(deptStore.removeDept, fetchData);

const handleEdit = (data?: SysDept | string) => {
  EditDrawerRef.value.show(data || deptTree.value[0].id);
};

onMounted(() => {
  fetchData();
});
</script>
<style scoped lang="postcss">
:deep(.in-filter-container-header) {
  padding: 0 !important;
}
</style>

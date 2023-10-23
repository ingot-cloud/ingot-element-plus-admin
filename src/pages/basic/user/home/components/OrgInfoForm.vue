<template>
  <div v-loading="loading">
    <div v-if="orgList && orgList.length > 0">
      <OrgInfoFormItem
        v-for="org in orgList"
        :key="org.orgId"
        :user-id="userId"
        :org="org"
        ref="OrgInfoFormItemRef"
        @success="fetchData"
      />
    </div>
    <el-empty v-else description="暂无组织" />
  </div>
  <OrgInfoCreateDialog ref="CreateDialogRef" @success="fetchData" />
</template>
<script setup lang="ts">
import type { UserOrgInfoVO } from "@/models";
import { UserOrgInfoAPI } from "@/api/basic/user";
import OrgInfoFormItem from "./OrgInfoFormItem.vue";
import OrgInfoCreateDialog from "./OrgInfoCreateDialog.vue";

const CreateDialogRef = ref();
const OrgInfoFormItemRef = ref();
const loading = ref(false);
const userId = ref("");
const orgList = ref<Array<UserOrgInfoVO>>([]);

const fetchData = () => {
  loading.value = true;
  UserOrgInfoAPI(userId.value)
    .then((response) => {
      loading.value = false;
      orgList.value = response.data;
      nextTick(() => {
        OrgInfoFormItemRef.value.forEach((itemRef: any) => {
          itemRef.refresh();
        });
      });
    })
    .catch(() => {
      loading.value = false;
    });
};

defineExpose({
  setData(id: string) {
    userId.value = id;
    fetchData();
  },
  addOrg(userId: string) {
    CreateDialogRef.value.show(userId);
  },
});
</script>
<style scoped lang="postcss">
.title-container {
  font-weight: 500;
  font-size: 12px;
  line-height: 22px;
  padding: 4px 20px;
  background: #f2f2f6;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & .edit {
    cursor: pointer;
    color: var(--in-color-primary);
  }
  & .cancel {
    cursor: pointer;
    color: var(--in-color-danger);
  }
}
</style>

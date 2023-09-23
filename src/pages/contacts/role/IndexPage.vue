<template>
  <in-filter-container>
    <template #header>
      <ContactsTabs select-tab="角色" />
    </template>

    <template #left>
      <div w-260px>
        <LeftContent @onNodeClick="userOps.handleTreeNodeClick" />
      </div>
    </template>

    <in-table
      hide-setting
      :loading="userOps.loading.value"
      :data="userOps.pageInfo.records"
      :headers="tableHeaders"
      :page="userOps.pageInfo"
      ref="tableRef"
      @refresh="userOps.fetchUserData"
      @handleSizeChange="userOps.fetchUserData"
      @handleCurrentChange="userOps.fetchUserData"
    >
      <template #title>
        {{ userOps.currentNode.name || "请选择角色" }}
      </template>
      <template #toolbar>
        <in-button
          v-if="userOps.currentNode.name"
          type="primary"
          @click="privateAddMember"
        >
          添加成员
        </in-button>
      </template>
      <template #avatar="{ item }">
        <div flex flex-row items-center gap-2 justify-start>
          <el-image
            v-if="item.avatar"
            class="w-30px h-30px"
            :src="item.avatar"
            fit="cover"
          />
          {{ item.nickname }}
        </div>
      </template>
      <template #actions="{ item }">
        <in-button-delete
          v-if="userOps.currentNode.type !== RoleType.Custom"
          @click="privateHandleDelete(item)"
        />
      </template>
    </in-table>
  </in-filter-container>

  <AddMemberDialog ref="AddMemberDialogRef" @success="userOps.fetchUserData" />
</template>
<script lang="ts" setup>
import ContactsTabs from "@/pages/contacts/components/ContactsTabs.vue";
import LeftContent from "./components/LeftContent.vue";
import { useUserOps } from "./useUserOps";
import { tableHeaders } from "./table";
import AddMemberDialog from "./components/AddMemberDialog.vue";
import { BindUserAPI } from "@/api/org/role";
import { RoleType } from "@/models/enums";

const AddMemberDialogRef = ref();
const userOps = useUserOps();
const confirm = useMessageConfirm();
const privateAddMember = () => {
  AddMemberDialogRef.value.show(userOps.currentNode);
};
const privateHandleDelete = (item: any) => {
  confirm
    .warning(
      `是否将成员(${item.nickname})移除角色(${userOps.currentNode.name})`
    )
    .then(() => {
      BindUserAPI({
        id: userOps.currentNode.id,
        removeIds: [item.userId],
      }).then(() => {
        userOps.fetchUserData();
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

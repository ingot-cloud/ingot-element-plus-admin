<template>
  <in-filter-container>
    <template #header>
      <ContactsTabs select-tab="成员" />
    </template>

    <template #left>
      <div w-260px>
        <LeftContent @onNodeClick="userOps.handleTreeNodeClick" />
      </div>
    </template>

    <in-table
      :loading="userOps.loading.value"
      :data="userOps.pageInfo.records"
      :headers="tableHeaders"
      :page="userOps.pageInfo"
      ref="tableRef"
      @refresh="userOps.fetchUserData"
      @handleSizeChange="userOps.fetchUserData"
      @handleCurrentChange="userOps.fetchUserData"
    >
      <template #title> {{ userOps.currentDeptNode.name }} </template>
      <template #toolbar>
        <in-button type="primary" @click="handleCreateUser"> 添加 </in-button>
      </template>
      <template #avatar="{ item }">
        <div flex flex-row items-center gap-2 justify-center>
          <el-image
            v-if="item.avatar"
            class="w-30px h-30px"
            :src="item.avatar"
            fit="cover"
          />
          {{ item.username }}
        </div>
      </template>
      <template #status="{ item }">
        <common-status-tag :status="item.status" />
      </template>
      <template #actions="{ item }">
        <in-button link text type="primary" @click="handleDetailUser(item)">
          <template #icon>
            <i-mdi:card-account-details-outline />
          </template>
          详情
        </in-button>
        <common-status-button
          text
          link
          :status="item.status"
          @click="userOps.handleDisableUser(item)"
        />
        <in-button
          link
          text
          type="danger"
          @click="userOps.handleDeleteUser(item)"
        >
          <template #icon>
            <i-ep:delete />
          </template>
          删除
        </in-button>
      </template>
    </in-table>
  </in-filter-container>
</template>
<script lang="ts" setup>
import type { UserPageItemVO } from "@/models";
import ContactsTabs from "@/pages/contacts/components/ContactsTabs.vue";
import LeftContent from "./components/LeftContent.vue";
import { useUserOps } from "./useUserOps";
import { tableHeaders } from "./table";

const userOps = useUserOps();
const handleCreateUser = () => {};
const handleDetailUser = (item: UserPageItemVO) => {};
</script>
<style scoped lang="postcss">
:deep(.in-filter-container-header) {
  padding: 0 !important;
}
</style>

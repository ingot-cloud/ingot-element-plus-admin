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
        <div class="title">{{ userOps.currentNode.name }}</div>
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
    </in-table>
  </in-filter-container>
</template>
<script lang="ts" setup>
import ContactsTabs from "@/pages/contacts/components/ContactsTabs.vue";
import LeftContent from "./components/LeftContent.vue";
import { useUserOps } from "./useUserOps";
import { tableHeaders } from "./table";

const userOps = useUserOps();
</script>
<style scoped lang="postcss">
:deep(.in-filter-container-header) {
  padding: 0 !important;
}
</style>

<template>
  <in-filter-container>
    <template #left>
      <div w-260px>
        <LeftContent @onNodeClick="handleTreeNodeClick" />
      </div>
    </template>

    <AuthorityView ref="AuthorityViewRef" />
  </in-filter-container>
</template>
<script lang="ts" setup>
import LeftContent from "./components/LeftContent.vue";
import type { RoleGroupItemVO } from "@/models";
import AuthorityView from "./components/AuthorityView.vue";

const id = ref("");
const AuthorityViewRef = ref();

const handleTreeNodeClick = (node: RoleGroupItemVO): void => {
  id.value = node.id!;
  AuthorityViewRef.value.setCurrentNode(node);
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

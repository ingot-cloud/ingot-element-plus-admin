<template>
  <div class="role-filter">
    <el-input
      v-model="searchValue"
      placeholder="搜索角色"
      :prefix-icon="Search"
      clearable
    />
  </div>
</template>
<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
const searchValue = ref("");
</script>
<style scoped lang="postcss">
.role-filter {
  @apply flex flex-col;
}
</style>

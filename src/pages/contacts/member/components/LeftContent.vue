<template>
  <div class="dept-filter">
    <el-input
      v-model="searchValue"
      placeholder="搜索部门"
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
.dept-filter {
  @apply flex flex-col;
}
</style>

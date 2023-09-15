<template>
  <div>
    <el-input
      v-model="searchValue"
      placeholder="Please input"
      :prefix-icon="Search"
    />
  </div>
</template>
<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";

const searchValue = ref("");
</script>

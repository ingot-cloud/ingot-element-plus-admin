<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="cacheViews">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
<script lang="ts" setup>
const cacheViews: string[] = [];
</script>

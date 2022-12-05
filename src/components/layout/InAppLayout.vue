<template>
  <el-container w-full h-full min-w-740px>
    <el-aside>
      <in-sidebar-menu />
    </el-aside>

    <el-container>
      <el-header>
        <in-app-bar />
      </el-header>

      <el-main>
        <router-view v-slot="{ Component }">
          <keep-alive :include="cacheViews">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
const cacheViews: string[] = [];
</script>
<style lang="postcss" scoped>
.el-aside {
  @apply overflow-inherit box-border w-auto\! bg-[var(--sidebar-bg-color)] b-r b-r-[var(--sidebar-bg-color)] dark:b-r-[var(--el-border-color)];
}

.el-header {
  @apply flex items-center justify-between box-border dark:bg-[var(--el-bg-color)] b-b b-b-[var(--el-border-color)];
}

.el-main {
  @apply bg-[var(--el-bg-color-page)] box-border p-10px overflow-x-hidden;
  &::-webkit-scrollbar {
    @apply bg-[var(--el-bg-color-page)];
  }
}
</style>

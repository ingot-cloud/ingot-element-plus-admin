<template>
  <el-container w-full h-full min-w-740px>
    <el-aside>
      <in-menu />
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
  @apply overflow-inherit box-border w-auto\! bg-[var(--in-sidebar-bg-color)] b-r b-r-[var(--in-sidebar-bg-color)] dark:b-r-[var(--in-border-color)];
}

.el-header {
  @apply flex items-center justify-between box-border dark:bg-[var(--in-bg-color)] b-b b-b-[var(--in-border-color)];
}

.el-main {
  @apply bg-[var(--in-bg-color-page)] box-border p-10px overflow-x-hidden;
  &::-webkit-scrollbar {
    @apply bg-[var(--in-bg-color-page)];
  }
}
</style>

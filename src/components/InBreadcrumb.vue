<template>
  <el-breadcrumb>
    <el-breadcrumb-item
      v-for="item in breadcrumbList"
      :key="item.path"
      :to="item.path"
    >
      <div flex items-center class="h-[var(--in-menu-icon-size)]">
        <in-icon
          v-if="item.icon"
          :name="item.icon"
          class="w-[var(--in-breadcrumb-icon-size)] h-[var(--in-breadcrumb-icon-size)] mr-5px"
        />
        <span>{{ item.title }}</span>
      </div>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { useRouterStore } from "@/stores/modules/router";

const route = useRoute();
// watch(route, (v) => {
//   console.log(v.matched);
// });
const { getBreadcrumb } = useRouterStore();
const breadcrumbList = computed(() => {
  return getBreadcrumb[route.path];
});
</script>

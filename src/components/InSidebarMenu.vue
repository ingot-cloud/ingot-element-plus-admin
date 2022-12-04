<template>
  <el-menu
    class="ingot-sidebar-menu"
    :collapse="!opened"
    text-color="#303133"
    active-text-color="var(--el-color-primary)"
    :default-active="activePath"
    router
    @select="onNavMenuSelect"
  >
    <in-sidebar-item v-for="route in menus" :key="route.path" :route="route" />
  </el-menu>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAppSidebarStore } from "@/stores/app";
import { userRouterStore } from "@/stores/router";

const router = useRouter();
const opened = useAppSidebarStore().getSidebarOpened;
const activePath = computed(() => router.currentRoute.value.path);
const menus = userRouterStore().getMenus;
const onNavMenuSelect = () => {
  // todo toggleMenu()
};
</script>

<template>
  <el-menu
    class="ingot-sidebar-menu"
    :collapse="!opened"
    :background-color="sidebarBackgroundColor"
    :text-color="sidebarTextColor"
    :active-text-color="sidebarActiveTextColor"
    :default-active="activePath"
    router
    @select="onNavMenuSelect"
  >
    <ingot-sidebar-item
      v-for="route in menus"
      :key="route.path"
      :route="route"
    />
  </el-menu>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { getSidebarStatus } from "@/store/composition/app";
import { getMenus } from "@/store/composition/router";
import { SidebarStyle } from "@/theme";

const router = useRouter();
const store = useStore();
const { opened } = getSidebarStatus(store);
const { sidebarBackgroundColor, sidebarTextColor, sidebarActiveTextColor } =
  SidebarStyle();
const activePath = computed(() => router.currentRoute.value.path);
const menus = getMenus(store);
const onNavMenuSelect = () => {
  // todo toggleMenu()
};
</script>

<style lang="stylus">
@import "~@/theme/style/component/sidebar-menu.styl";
</style>

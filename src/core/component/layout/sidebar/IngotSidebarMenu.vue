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
    <SidebarItem v-for="route in menus" :key="route.path" :route="route" />
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { getSidebarStatus } from "@/core/store/composition/app";
import { getMenus } from "@/core/store/composition/router";
import { SidebarStyle } from "@/theme";
import SidebarItem from "./SidebarItem.vue";

export default defineComponent({
  components: {
    SidebarItem
  },
  props: {},
  setup() {
    const router = useRouter();
    const store = useStore();
    const { opened } = getSidebarStatus(store);
    const {
      scrollbarStyle,
      sidebarBackgroundColor,
      sidebarTextColor,
      sidebarActiveTextColor
    } = SidebarStyle();

    return {
      opened,
      scrollbarStyle,
      sidebarBackgroundColor,
      sidebarTextColor,
      sidebarActiveTextColor,
      activePath: computed(() => router.currentRoute.value.path),
      menus: getMenus(store),
      onNavMenuSelect: () => {
        // todo toggleMenu()
      }
    };
  }
});
</script>

<style lang="stylus">
@import "~@/theme/style/component/sidebar-menu.styl";
</style>

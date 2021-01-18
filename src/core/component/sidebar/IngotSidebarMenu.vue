<template>
  <el-menu
    class="ingot-sidebar-menu"
    :collapse="!opened"
    :background-color="sidebarBackgroundColor"
    :text-color="sidebarTextColor"
    :active-text-color="sidebarActiveTextColor"
    :default-active="activePath"
    router
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
      menus: getMenus(store)
    };
  }
});
</script>

<style lang="stylus">
@import "~@/theme/style/variables.styl";

.el-menu.ingot-sidebar-menu
  border-right none !important
  .el-menu-item
  .el-submenu__title
    height sidebar-menu-height
    .title
      margin-left 25px
    .menu-icon
      position absolute
      width 20px
      height 20px
      top "calc((%s - %s) / 2)" % (sidebar-menu-height @height)
  .el-submenu .el-menu-item
    height sidebar-menu-height
    line-height @height
</style>

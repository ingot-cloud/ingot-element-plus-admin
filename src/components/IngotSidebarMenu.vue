<template>
  <el-menu
    class="ingot-sidebar-menu"
    :collapse="!opened"
    :background-color="sidebarBackgroundColor"
    :text-color="sidebarTextColor"
    :active-text-color="sidebarActiveTextColor"
  >
    <el-submenu index="1">
      <template #title>
        <ingot-icon icon="management" className="menu-icon" />
        <span class="title">导航一</span>
      </template>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
    </el-submenu>
    <el-menu-item index="2">
      <ingot-icon icon="management" className="menu-icon" />
      <template #title>
        <span class="title">导航二</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { getSidebarStatus } from "@/store/composition/app";
import { SidebarStyle } from "@/theme";

export default defineComponent({
  props: {},
  setup() {
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
      sidebarActiveTextColor
    };
  }
});
</script>

<style lang="stylus">
@import "~@/theme/style/variables.styl";

.el-menu.ingot-sidebar-menu
  border-right none !important
  &>.el-menu-item
  .el-submenu__title
    height sidebar-menu-height
    .title
      margin-left 25px
    .menu-icon
      position absolute
      width 20px
      height 20px
      top "calc((%s - %s) / 2)" % (sidebar-menu-height @height)
</style>

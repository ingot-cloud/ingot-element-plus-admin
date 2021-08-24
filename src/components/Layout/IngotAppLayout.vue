<template>
  <div :class="appLayoutClass">
    <ingot-app-bar />
    <el-scrollbar
      class="sidebar-container"
      wrap-class="scrollbar-wrapper"
      :style="scrollbarStyle"
    >
      <ingot-sidebar-menu />
    </el-scrollbar>
    <div class="content-container">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from "@/store";
import { getAppLayoutClass } from "@/store/composition/app";
import { SidebarStyle } from "@/theme";

const store = useStore();
const { appLayoutClass } = getAppLayoutClass(store);
const { scrollbarStyle } = SidebarStyle();
</script>
<style lang="stylus">
@import "~@/theme/style/app-layout.styl";
</style>

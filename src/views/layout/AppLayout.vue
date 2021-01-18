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
<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { getAppLayoutClass } from "@/core/store/composition/app";
import { SidebarStyle } from "@/theme";

export default defineComponent({
  setup() {
    const store = useStore();
    const { appLayoutClass } = getAppLayoutClass(store);
    const { scrollbarStyle } = SidebarStyle();
    return {
      appLayoutClass,
      scrollbarStyle
    };
  }
});
</script>
<style lang="stylus">
@import "~@/theme/style/app-layout.styl";
</style>

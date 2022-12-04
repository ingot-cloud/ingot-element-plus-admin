<template>
  <div :class="mainLayoutClass">
    <AppBar />
    <el-scrollbar class="sidebar-container" wrap-class="scrollbar-wrapper">
      <ingot-sidebar-menu />
    </el-scrollbar>
    <div class="content-container">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useAppSidebarStore } from "@/stores/app";
// import { useStore } from "@/store";
// import { getAppLayoutClass } from "@/store/composition/app";
// import { SidebarStyle } from "@/theme";

const appSidebarStore = useAppSidebarStore();
const mainLayoutClass = computed(() => {
  return {
    "ingot-app-layout": true,
    "hide-sidebar": !appSidebarStore.getSidebarOpened,
  };
});

// const store = useStore();
// const { appLayoutClass } = getAppLayoutClass(store);
// const { scrollbarStyle } = SidebarStyle();
</script>
<style lang="postcss">
.ingot-app-layout {
  --sidebar-width: 180px;
  & .content-container {
    padding-top: var(--app-bar-height);
    height: calc(100vh - var(--app-bar-height));
    margin-left: var(--sidebar-width);
    transition: var(--sidebar-width) 0.28s;
  }

  & .sidebar-container {
    box-shadow: rgba(0, 0, 0, 0.08) 1px 0px 4px 0px;
    transition: var(--sidebar-width) 0.1s;
    padding-top: var(--app-bar-height);
    width: var(--sidebar-width) !important;
    height: calc(100vh - var(--app-bar-height)) !important;
    z-index: 100;
    overflow: hidden;
    position: fixed !important;
    top: 0;
    left: 0;
    bottom: 0;
    & .horizontal-collapse-transition {
      transition: 0s width ease-in-out, 0s padding-left ease-in-out,
        0s padding-right ease-in-out;
    }

    & .el-scrollbar__bar.is-vertical {
      right: 0px;
    }

    & .scrollbar-wrapper {
      overflow-x: hidden !important;
      .el-scrollbar__view {
        height: 100%;
      }
    }
  }
}

.hide-sidebar {
  .content-container {
    margin-left: var(--sidebar-collapse-width);
  }

  .sidebar-container {
    /* width: 0px !important;*/
    width: var(--sidebar-collapse-width) !important;
    /* 隐藏时候不显示菜单，所以有如上注释*/
  }
}
</style>

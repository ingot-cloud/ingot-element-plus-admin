<template>
  <el-scrollbar wrap-class="scrollbar-wrapper" :style="scrollbarStyle">
    <el-menu
      @open="handleOpen"
      @close="handleClose"
      :background-color="sidebarBackgroundColor"
      :text-color="sidebarTextColor"
      :active-text-color="sidebarActiveTextColor"
    >
      <el-submenu index="1">
        <template #title>
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <template #title>导航二</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <template #title>导航三</template>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <template #title>导航四</template>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SidebarStyle } from "@/theme";

export default defineComponent({
  props: {},
  setup() {
    const {
      scrollbarStyle,
      sidebarBackgroundColor,
      sidebarTextColor,
      sidebarActiveTextColor
    } = SidebarStyle();

    return {
      scrollbarStyle,
      sidebarBackgroundColor,
      sidebarTextColor,
      sidebarActiveTextColor
    };
  },
  methods: {
    handleOpen() {
      //
    },
    handleClose() {
      //
    }
  }
});
</script>

<style scoped lang="stylus"></style>

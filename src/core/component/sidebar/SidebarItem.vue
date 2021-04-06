<template>
  <el-menu-item v-if="isSingle" :index="singleRoute.path">
    <ingot-icon :icon="singleRoute.meta.icon" className="menu-icon" />
    <template #title>
      <span class="title">
        {{ singleRoute.meta.title }}
      </span>
    </template>
  </el-menu-item>
  <el-submenu v-else :index="route.path">
    <template #title>
      <ingot-icon :icon="route.meta.icon" className="menu-icon" />
      <span class="title">
        {{ route.meta.title }}
      </span>
    </template>
    <SidebarItem
      v-for="child in route.children"
      :key="child.path"
      :route="child"
    />
  </el-submenu>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    route: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    return {
      isSingle: computed(() => {
        const children = props.route.children;
        return !children || children.length === 0 || children.length === 1;
      }),
      singleRoute: computed(() => {
        const children = props.route.children;
        if (!children || children.length === 0) {
          return props.route;
        }

        return props.route.children[0];
      })
    };
  }
});
</script>

<style lang="stylus">
@import "~@/theme/style/variables.styl";
</style>

<template>
  <el-menu-item v-if="isSingle" :index="singleRoute.path">
    <!-- <ingot-icon :icon="singleRoute.meta.icon" className="menu-icon" /> -->
    <template #title>
      <span class="menu-title">
        {{ singleRoute.meta.title }}
      </span>
    </template>
  </el-menu-item>
  <el-sub-menu v-else :index="route.path">
    <template #title>
      <ingot-icon :icon="route.meta.icon" className="menu-icon" />
      <span class="menu-title">
        {{ route.meta.title }}
      </span>
    </template>
    <in-sidebar-item
      v-for="child in route.children"
      :key="child.path"
      :route="child"
    />
  </el-sub-menu>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  route: {
    type: Object,
    default: null,
  },
});

const isSingle = computed(() => {
  const children = props.route.children;
  return !children || children.length === 0 || children.length === 1;
});

const singleRoute = computed(() => {
  const children = props.route.children;
  if (!children || children.length === 0) {
    return props.route;
  }

  return props.route.children[0];
});
</script>

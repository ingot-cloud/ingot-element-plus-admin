<template>
  <el-menu-item v-if="isSingle" :index="singleRoute.path">
    <in-icon
      v-if="singleRoute.meta && singleRoute.meta.icon"
      :name="singleRoute.meta.icon"
      mr-2
      w-20px
      h-20px
    />
    <template #title>
      <span v-if="singleRoute.meta && singleRoute.meta.title">
        {{ singleRoute.meta.title }}
      </span>
    </template>
  </el-menu-item>
  <el-sub-menu v-else :index="route.path">
    <template #title>
      <in-icon
        v-if="route.meta && route.meta.icon"
        :name="route.meta.icon"
        mr-2
        w-20px
        h-20px
      />
      <span v-if="route.meta && route.meta.title">
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
import type { PropType } from "vue";
import type { RouteRecordRaw } from "vue-router";

const props = defineProps({
  route: {
    type: Object as PropType<RouteRecordRaw>,
    default: null,
  },
});

const isSingle = computed(() => {
  const children = props.route.children;
  return !children || children.length === 0 || children.length === 1;
});

const singleRoute = computed(() => {
  const children = props.route.children;
  if (children && children.length !== 0) {
    return children[0];
  }
  return props.route;
});
</script>

<template>
  <el-menu-item v-if="isSingle" :index="singleRoute.path">
    <in-icon
      v-if="singleRoute.meta && singleRoute.meta.icon"
      :name="singleRoute.meta.icon"
      class="w-[var(--in-menu-icon-size)] h-[var(--in-menu-icon-size)]"
      :class="{ 'mr-2': getMenuOpened }"
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
        class="w-[var(--in-menu-icon-size)] h-[var(--in-menu-icon-size)]"
        :class="{ 'mr-2': getMenuOpened }"
      />
      <span v-if="route.meta && route.meta.title">
        {{ route.meta.title }}
      </span>
    </template>
    <in-submenu
      v-for="child in route.children"
      :key="child.path"
      :route="child"
    />
  </el-sub-menu>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { RouteRecordRaw } from "vue-router";
import { useAppStateStore } from "@/stores/modules/app";

const props = defineProps({
  route: {
    type: Object as PropType<RouteRecordRaw>,
    default: null,
  },
});

const { getMenuOpened } = storeToRefs(useAppStateStore());

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

<template>
  <el-dropdown trigger="click">
    <span i-mdi-format-size />

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in ComponentSizeList"
          :key="item"
          :disabled="componentSize === item.value"
          @click="appStore.changeComponentSize(item.value)"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/modules/app";
import { storeToRefs } from "pinia";
import { ComponentSizeList } from "./types";
const appStore = useAppStore();
const { componentSize } = storeToRefs(appStore);
</script>

<script setup lang="ts">
import { useToggle, useDark } from "@vueuse/core";
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <div>{{ isDark }}</div>
  <el-button @click="toggleDark()">
    <span class="ml-2">{{ isDark ? "Dark" : "Light" }}</span>
  </el-button>
</template>

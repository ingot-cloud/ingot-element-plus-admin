<script setup lang="ts">
import { useToggle, useDark } from "@vueuse/core";
import IconDark from "./icons/IconDark.vue";
import IconLight from "./icons/IconLight.vue";
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <!-- <in-button @click="toggleDark()">
    <span class="ml-2">{{ isDark ? "Dark" : "Light" }}</span>
  </in-button> -->
  <el-switch
    v-model="isDark"
    inline-prompt
    style="
      --el-switch-on-color: var(--in-color-primary);
      --el-switch-off-color: var(--in-color-primary);
    "
    :active-icon="IconDark"
    :inactive-icon="IconLight"
  />
</template>

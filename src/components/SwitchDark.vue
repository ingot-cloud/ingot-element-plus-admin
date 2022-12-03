<script setup lang="ts">
import { useToggle, useDark } from "@vueuse/core";
import IconDark from "@/components/icons/IconDark.vue"
import IconLight from "@/components/icons/IconLight.vue"
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <!-- <el-button @click="toggleDark()">
    <span class="ml-2">{{ isDark ? "Dark" : "Light" }}</span>
  </el-button> -->
  <el-switch
    v-model="isDark"
    inline-prompt
    :active-icon="IconDark"
	:inactive-icon="IconLight"
  />
</template>

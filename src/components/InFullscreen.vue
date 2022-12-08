<template>
  <div
    :class="isFullscreen ? 'i-mdi-fullscreen-exit' : 'i-mdi-fullscreen'"
    cursor-pointer
    @click="useFullscreenFn.toggle()"
  ></div>
</template>
<script lang="ts" setup>
import { useFullscreen } from "@vueuse/core";
const useFullscreenFn = useFullscreen();
const isFullscreen = useFullscreenFn.isFullscreen;
</script>

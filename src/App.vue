<template>
  <keep-alive :include="cacheViews">
    <router-view />
  </keep-alive>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const cacheViews: string[] = [];

    return {
      cacheViews
    };
  }
});
</script>
<style lang="stylus"></style>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="cacheViews">
      <component :is="Component" />
    </keep-alive>
  </router-view>
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

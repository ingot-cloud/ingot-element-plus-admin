<template>
  <ingot-app-bar />
  <keep-alive :include="cacheViews">
    <router-view />
  </keep-alive>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
<style lang="stylus"></style>

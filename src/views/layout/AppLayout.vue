<template>
  <ingot-app-bar />
  <ingot-sidebar-menu class="sidebar-container" />
  <div class="content-container">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
<style lang="stylus">
@import "~@/theme/style/app-layout.styl";
</style>

<template>
  <div class="container">
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style scoped lang="stylus">
.container
  margin 10px
  background white
</style>

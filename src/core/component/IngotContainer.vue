<template>
  <div class="container">
    <div class="inside">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style scoped lang="stylus">
.container
  padding 10px
.inside
  background white
</style>

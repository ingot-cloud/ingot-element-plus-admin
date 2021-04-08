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
@import "~@/theme/style/variables.styl";
.container
  padding 10px
</style>

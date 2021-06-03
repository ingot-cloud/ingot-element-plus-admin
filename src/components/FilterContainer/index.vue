<template>
  <div class="filter-container">
    <div class="filter-title">
      <slot name="title"> </slot>
    </div>
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style lang="stylus">
@import "~@/theme/style/variables.styl";
.filter-container
  padding 10px
  display flex
  flex-direction row
  align-items center
  .filter-title
    flex 1
  .item
    margin-left 10px
  .item:first-child
    margin-left 0px
</style>

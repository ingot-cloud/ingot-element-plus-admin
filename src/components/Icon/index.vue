<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: "",
  },
});

const iconName = computed(() => `#icon-${props.icon}`);
const svgClass = computed(() => {
  if (props.className) {
    return "svg-icon " + props.className;
  } else {
    return "svg-icon";
  }
});
</script>

<style lang="stylus">
.svg-icon
  width: 1em;
  height: 1em;
  // vertical-align: -0.15em;
  fill: currentColor;
  // overflow: hidden;
</style>

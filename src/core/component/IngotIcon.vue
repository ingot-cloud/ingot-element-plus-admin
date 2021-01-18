<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ""
    }
  },
  computed: {
    iconName(): string {
      return `#icon-${this.icon}`;
    },
    svgClass(): string {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    }
  }
});
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  /* vertical-align: -0.15em; */
  fill: currentColor;
  /* overflow: hidden; */
}
</style>

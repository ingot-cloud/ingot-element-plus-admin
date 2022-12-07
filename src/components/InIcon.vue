<template>
  <svg aria-hidden="true">
    <use :xlink:href="`#ingot-${name}`" />
  </svg>
</template>
<script lang="ts" setup>
defineProps<{
  name: {
    type: String;
    required: true;
  };
}>();
</script>

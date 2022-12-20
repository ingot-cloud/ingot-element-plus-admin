<template>
  <div flex flex-row items-center>
    <div class="in-with-label">{{ title }}</div>
    <slot />
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  title: String;
}>();
</script>
<style lang="postcss">
.in-with-label {
  @apply color-[var(--in-text-color-primary)] m-r-5px;
  font-size: 12px;
}
</style>

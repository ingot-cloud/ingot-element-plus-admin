<template>
  <div class="in-container">
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="postcss" scoped>
.in-container {
  @apply w-full h-full box-border overflow-x-hidden p-12px dark:b rd
   dark:b-[var(--in-border-color)] bg-[var(--in-bg-color)] shadow-sm;
}
</style>

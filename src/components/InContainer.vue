<template>
  <div class="container">
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="postcss" scoped>
.container {
  @apply w-full h-full box-border overflow-x-hidden p-20px b rd b-[var(--in-border-color)] bg-[var(--in-bg-color)] shadow-sm;
}
</style>

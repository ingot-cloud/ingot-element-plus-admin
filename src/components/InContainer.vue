<template>
  <div class="in-container">
    <el-backtop target=".in-container" :right="100" :bottom="100">
      <div flex items-center justify-center>
        <i-material-symbols:vertical-align-top-rounded />
      </div>
    </el-backtop>
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

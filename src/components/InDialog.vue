<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    center
  >
    <slot />
    <template #footer>
      <div flex flex-row justify-end items-center gap-4>
        <slot name="footer"> </slot>
      </div>
    </template>
  </el-dialog>
</template>

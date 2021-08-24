<template>
  <el-card>
    <template #header>
      <div class="ingot-page-header">
        <div
          v-if="!hideBack"
          class="ingot-page-header__left"
          @click="$emit('back')"
        >
          <i class="el-icon-back" />
          <div class="ingot-page-header__title">
            <slot name="title">
              {{ title }}
            </slot>
          </div>
        </div>

        <div class="ingot-page-header__content">
          <div class="ingot-page-header__content_left">
            <slot name="content">
              {{ content || $route.meta.title }}
            </slot>
          </div>

          <slot name="action" />
        </div>
      </div>
    </template>
    <slot />
  </el-card>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
defineProps({
  hideBack: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "返回",
  },
  content: {
    type: String,
    default: null,
  },
});
defineEmits(["back"]);
</script>

<style lang="stylus">
@import "~@/theme/style/component/page-card.styl";
</style>

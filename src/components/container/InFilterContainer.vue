<template>
  <div class="in-filter-container">
    <div class="in-filter-container-header" v-if="slot.header">
      <slot name="header"> </slot>
    </div>
    <div class="in-filter-container-left-right">
      <div class="left-filter" v-if="slot.left">
        <slot name="left"> </slot>
      </div>
      <el-container class="in-filter-container-right">
        <div class="top-filter" v-if="slot.top">
          <slot name="top"> </slot>
        </div>
        <div class="inner-container">
          <el-backtop
            v-if="showBacktop"
            target=".inner-container"
            :right="60"
            :bottom="60"
          >
            <div flex items-center justify-center>
              <i-material-symbols:vertical-align-top-rounded />
            </div>
          </el-backtop>
          <slot />
        </div>
      </el-container>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  showBacktop: {
    type: Boolean,
    default: true,
  },
});

const slot = useSlots();
</script>
<style lang="postcss" scoped>
.in-filter-container {
  @apply w-full h-full flex flex-col bg-[var(--in-bg-color)];
  border-radius: var(--in-common-border-radius);

  & .in-filter-container-left-right {
    @apply flex flex-row;
    flex: 1;
  }

  & .in-filter-container-header {
    @apply p-[var(--in-common-padding)];
    border-bottom: 1px solid var(--in-border-color);
  }
  & .left-filter {
    @apply p-[var(--in-common-padding)];
    border-right: 1px solid var(--in-border-color);
  }
  & .in-filter-container-right {
    @apply flex flex-col;
    & .top-filter {
      @apply p-[var(--in-common-padding)];
      border-bottom: 1px solid var(--in-border-color);
    }
    & .inner-container {
      @apply flex-1 box-border overflow-x-hidden p-[var(--in-common-padding)];
    }
  }
}
</style>

<template>
  <div class="in-global-setting" cursor-pointer @click="onClick">
    <in-icon name="icon-park-outline:setting-config" class="icon" />
  </div>
  <el-drawer v-model="drawer" title="配置" direction="rtl" size="300px">
    <div class="in-global-setting-list">
      <div class="in-global-setting-item">
        <span class="title">主题模式</span>
        <in-switch-dark />
      </div>
      <div class="in-global-setting-item">
        <span class="title">字体大小</span>
        <in-cmp-size />
      </div>
    </div>
  </el-drawer>
</template>
<script setup lang="ts">
const drawer = ref(false);

const onClick = () => {
  drawer.value = true;
};
</script>
<style scoped lang="postcss">
.in-global-setting {
  width: var(--in-app-bar-icon-size);
  height: var(--in-app-bar-icon-size);
  .icon {
    color: white;
    width: var(--in-app-bar-icon-size);
    height: var(--in-app-bar-icon-size);
  }
}
.in-global-setting-list {
  @apply gap-2;
}
.in-global-setting-item {
  @apply flex flex-row items-center;
  border-bottom: 1px solid var(--in-border-color);
  padding: 5px 0;
  height: 30px;
  .title {
    flex: 1;
    font-size: 14px;
    color: var(--in-text-color);
  }
}
</style>

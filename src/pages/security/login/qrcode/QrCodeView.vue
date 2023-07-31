<template>
  <div class="qrcode-box" :class="isShow ? 'login-anim-in' : ''">扫码登录</div>
</template>
<script lang="ts" setup>
defineProps({
  isShow: {
    type: Boolean,
    value: true,
  },
});
</script>
<style scoped lang="postcss">
.qrcode-box {
  padding-top: 70px;
}
</style>

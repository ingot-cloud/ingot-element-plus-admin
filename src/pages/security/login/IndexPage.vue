<template>
  <div class="login-page login-page-visible">
    <div class="banner-area" role="banner-area" :style="bannerStyle"></div>
    <div class="login-area">
      <div class="login-box"></div>
      <div class="login-copyright-bar">
        <div class="login-copyright">{{ app.copyright }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from "@/stores/modules/app";

const { app } = useAppStore();
const bannerStyle = `background-image: url("${app.loginBanner}");`;
</script>
<style lang="postcss" scoped>
.login-page {
  --login-banner-area-width: 500px;
  --login-box-width: 480px;
  --login-box-height: 600px;
  --login-copyright-bar-width: 480px;
  --login-copyright-bar-height: 60px;

  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  background: #ffffff;
  opacity: 0.01;
  transition: opacity 0.3s;

  &.login-page-visible {
    opacity: 1;
  }

  & .banner-area {
    position: absolute;
    width: var(--login-banner-area-width);
    left: 0;
    top: 0;
    bottom: 0;
    background-size: cover !important;
    background-position: center center;
  }

  & .login-area {
    position: absolute;
    left: var(--login-banner-area-width);
    top: 0;
    right: 0;
    bottom: 0;

    & .login-box {
      position: absolute;
      width: var(--login-box-width);
      height: var(--login-box-height);
      left: 50%;
      top: 50%;
      margin-left: calc(var(--login-box-width) / 2 * -1);
      margin-top: calc(var(--login-box-height) / 2 * -1);
      border-radius: 10px;
      border: 1px solid rgba(126, 134, 142, 0.16);
      box-shadow: 0 4px 14px 0 rgba(126, 134, 142, 0.16);
    }

    & .login-copyright-bar {
      position: absolute;
      width: var(--login-copyright-bar-width);
      height: var(--login-copyright-bar-height);
      bottom: 0;
      left: 50%;
      margin-left: calc(var(--login-copyright-bar-width) / 2 * -1);
      line-height: var(--login-copyright-bar-height);
      font-size: 12px;
      color: rgba(23, 26, 29, 0.6);
      text-align: left;
      & .login-copyright {
        float: left;
        padding: 0 7px;
      }
    }
  }
}
</style>

<template>
  <div class="login-topbar">
    <div class="topbar-content">
      <div class="title-left">{{ app.title }}</div>
      <div class="title-right">登录</div>
      <in-spacer />
      <in-switch-dark />
    </div>
  </div>
  <div class="login-container">
    <div class="login-content">
      <el-tabs v-model="currentTab" stretch>
        <el-tab-pane v-for="item in tabs" :key="item.name" :name="item.name">
          <template #label>
            <span><i class="el-icon-date"></i> {{ item.title }}</span>
          </template>
          <PasswordView v-if="currentTab === LoginType.Password" />
          <SmsView v-if="currentTab === LoginType.Sms" />
        </el-tab-pane>
      </el-tabs>
      <div class="other-login">其他登录方式</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/modules/app";
import PasswordView from "./password/PasswordView.vue";
import SmsView from "./sms/SmsView.vue";

enum LoginType {
  Password = "password",
  Sms = "sms",
}

const { app } = storeToRefs(useAppStore());

const currentTab = LoginType.Password;
const tabs = [
  {
    title: "密码登录",
    name: LoginType.Password,
  },
  {
    title: "短信登录",
    name: LoginType.Sms,
  },
];
</script>

<style lang="postcss">
.login-topbar {
  box-sizing: border-box;
  border-bottom: 1px solid var(--in-border-color);
  height: 80px;
  width: 100%;
  position: absolute;
  z-index: 1000;
  clear: both;
  & .topbar-content {
    max-width: 1200px;
    margin: 0 auto;
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: 10px;
    & .title-left {
      font-size: 24px;
      padding: 0 10px;
      color: var(--in-color-primary);
    }
    & .title-right {
      text-align: left;
      font-size: 24px;
      padding: 0 10px;
      border-left: 1px solid #999;
      color: var(--in-text-color-primary);
    }
  }
}
.login-container {
  --login-content-height: 560px;
  --login-content-header-height: 52px;
  --login-content-other-login-height: 40px;
  --login-content-pannel-height: calc(
    var(--login-content-height) - var(--login-content-header-height) -
      var(--login-content-other-login-height)
  );
  --other-login-text-color: #999999;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & .login-content {
    box-shadow: var(--in-box-shadow);
    height: var(--login-content-height);
    width: 600px;
    & .el-tabs__header {
      margin: 0;
      & .el-tabs__item {
        height: var(--login-content-header-height);
        line-height: var(--login-content-header-height);
      }
    }
    & .el-tabs__content {
      height: var(--login-content-pannel-height);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }
    & .other-login {
      border-top: 1px solid #d8d8d8;
      color: var(--other-login-text-color);
      height: var(--login-content-other-login-height);
      line-height: var(--login-content-other-login-height);
      font-size: 14px;
      padding-left: 20px;
    }
  }
}
</style>

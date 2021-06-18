<template>
  <div class="login-topbar" :style="content">
    <div class="topbar-content">
      <div class="title-left" :style="topbarTitleLeft">Ingot Cloud</div>
      <div class="title-right" :style="topbarTitleRight">登录</div>
    </div>
  </div>
  <div class="login-container">
    <div class="login-content" :style="content">
      <el-tabs v-model="currentTab" stretch>
        <el-tab-pane v-for="item in tabs" :key="item.name" :name="item.name">
          <template #label>
            <span><i class="el-icon-date"></i> {{ item.title }}</span>
          </template>
          <Password v-if="currentTab === LoginType.Password" />
          <ScanCode v-if="currentTab === LoginType.ScanCode" />
        </el-tab-pane>
      </el-tabs>
      <div class="other-login" :style="otherLogin">其他登录方式</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Password from "./Password.vue";
import ScanCode from "./ScanCode.vue";
import { LoginColorStyle } from "@/theme";

enum LoginType {
  Password = "password",
  ScanCode = "scanCode",
}

export default defineComponent({
  components: { Password, ScanCode },
  data() {
    return {
      currentTab: LoginType.Password,
      tabs: [
        {
          title: "账户密码登录",
          name: LoginType.Password,
        },
        {
          title: "扫码登录",
          name: LoginType.ScanCode,
        },
      ],
    };
  },
  setup() {
    const { topbarTitleLeft, topbarTitleRight, content, otherLogin } =
      LoginColorStyle();

    return {
      topbarTitleLeft,
      topbarTitleRight,
      content,
      otherLogin,
      LoginType,
    };
  },
});
</script>

<style lang="stylus">
login-content-height = 560px
login-content-header-height = 52px
login-content-other-login-height = 40px
login-content-pannel-height = "calc(%s - %s - %s)" % (login-content-height login-content-header-height login-content-other-login-height)

.login-topbar
  box-shadow 0 2px 4px 0 rgba(0,0,0,.1);
  box-sizing border-box
  height 80px
  width 100%
  position absolute
  z-index 1000
  clear: both
  .topbar-content
    max-width 1200px
    margin 0 auto
    height 80px
    display flex
    flex-direction row
    align-items center
    .title-left
      font-size 24px
      padding 0 10px
    .title-right
      text-align left
      font-size 24px
      padding 0 10px
      border-left 1px solid #999
.login-container
  height 100vh
  display flex
  flex-direction column
  justify-content center
  align-items center
  .login-content
    box-shadow 0 2px 15px rgba(0,0,0,.15)
    height login-content-height
    width 600px
    .el-tabs__header
      margin 0
      .el-tabs__item
        height login-content-header-height
        line-height @height
    .el-tabs__content
      height login-content-pannel-height
      display flex
      flex-direction column
      align-items center
      justify-content flex-start
    .other-login
      border-top 1px solid #d8d8d8
      height login-content-other-login-height
      line-height @height
      font-size 14px
      padding-left 20px
</style>

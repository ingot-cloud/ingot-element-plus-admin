<template>
  <div class="login-topbar" :style="content">
    <div class="topbar-content">
      <div class="title-left" :style="topbarTitleLeft">Ingot Cloud</div>
      <div class="title-right" :style="topbarTitleRight">登录</div>
    </div>
  </div>
  <div class="login-container">
    <el-tabs
      v-model="currentTab"
      class="login-content"
      :style="content"
      stretch
    >
      <el-tab-pane v-for="item in tabs" :key="item.name" :name="item.name">
        <template #label>
          <span><i class="el-icon-date"></i> {{ item.title }}</span>
        </template>
        {{ item.content }}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { LoginColorStyle } from "@/theme";

export default defineComponent({
  components: {},
  data() {
    return {
      currentTab: "1",
      tabs: [
        {
          title: "账户密码登录",
          name: "1",
          content: "Tab 1 content"
        },
        {
          title: "扫码登录",
          name: "2",
          content: "Tab 2 content"
        }
      ]
    };
  },
  setup() {
    const { topbarTitleLeft, topbarTitleRight, content } = LoginColorStyle();

    return {
      topbarTitleLeft,
      topbarTitleRight,
      content
    };
  }
});
</script>

<style lang="stylus">
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
    height 560px
    width 600px
    .el-tabs__header
      margin 0
    .el-tabs__content
      height 100%
</style>

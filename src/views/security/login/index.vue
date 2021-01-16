<template>
  <div class="login-topbar">
    <div class="topbar-content" :style="content">
      <div class="title-left" :style="topbarTitleLeft">Ingot Cloud</div>
      <div class="title-right" :style="topbarTitleRight">登录</div>
    </div>
  </div>
  <div class="login-container">
    <div class="login-container" :style="content">
      container
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { LoginColorStyle } from "@/theme";

export default defineComponent({
  components: {},
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

<style lang="stylus" scoped>
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
  .login-container
    box-shadow 0 2px 15px rgba(0,0,0,.15)
    height 560px
    width 600px
</style>

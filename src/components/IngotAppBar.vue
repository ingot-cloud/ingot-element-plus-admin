<template>
  <div class="app-bar" :style="appBarStyle">
    <div
      class="menu-icon-container"
      :style="menuIconStyle"
      @click="onMenuClick"
    >
      <ingot-icon icon="menu" className="menu-icon" />
    </div>
    <div class="logo" :style="logoStyle">
      <img class="logo-image" src="../assets/logo-orange.png" />
      <span class="logo-text">Ingot Cloud</span>
    </div>
    <div style="flex:1;"></div>

    <div class="menu">
      <div class="avatar-menu">
        <el-dropdown trigger="hover">
          <div class="avatar-wrapper">
            <img
              src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
              class="user-avatar"
            />
          </div>
          <template #dropdown>
            <el-dropdown-menu class="user-dropdown">
              <router-link class="inlineBlock" to="/">
                <el-dropdown-item>
                  修改密码
                </el-dropdown-item>
              </router-link>
              <el-dropdown-item divided>
                <span style="display:block;">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { AppBarStyle } from "@/theme";

export default defineComponent({
  props: {
    title: String
  },
  setup() {
    const { appBarStyle, menuIconStyle, logoStyle } = AppBarStyle();
    return { appBarStyle, menuIconStyle, logoStyle };
  },
  methods: {
    onMenuClick() {
      //
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "~@/theme/style/variables.styl";

.app-bar
  position fixed
  top 0
  left 0
  width 100%
  height nav-bar-height
  display flex
  flex-direction row
  align-items center
  box-shadow rgba(0, 0, 0, 0.08) 0px 1px 4px 0px
  z-index 1000 !important
  .menu-icon-container
    height nav-bar-height
    width 50px
    display flex
    align-items center
    justify-content center
    .menu-icon
      width 25px
      height 25px
  .logo
    margin-left 10px
    display flex
    flex-direction row
    align-items center
    justify-content center
    .logo-image
      height 35px
      width 35px
    .logo-text
      margin-left 2px
      font-size 24px
      font-weight blod
  .menu
    display flex
    flex-direction row
    align-items center
    justify-content flex-end
    .avatar-menu
      margin-right 10px
      .user-avatar
        width 36px
        height 36px
        border-radius 18px
</style>

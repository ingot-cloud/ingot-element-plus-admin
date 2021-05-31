<template>
  <div class="app-bar" :style="appBarStyle">
    <div class="menu-icon-container" :style="menuIconStyle" @click="toggleMenu">
      <!-- <MenuIcon className="menu-icon" :isActive="opened" /> -->
      <ingot-icon icon="nav-menu" className="nav-menu-icon" />
    </div>
    <div class="logo" :style="logoStyle">
      <img class="logo-image" src="@/assets/logo.png" />
      <span class="logo-text">{{ title }}</span>
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
                <span style="display:block;" @click="handleLogoutClick">
                  退出登录
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { AppBarStyle } from "@/theme";
import { getSidebarStatus, toggleMenu } from "@/core/store/composition/app";
import { handlLogout } from "@/core/security/auth";
// import MenuIcon from "./MenuIcon.vue";
import { useStore } from "@/store";

export default defineComponent({
  components: {
    // MenuIcon
  },
  setup() {
    const store = useStore();
    const { opened } = getSidebarStatus(store);
    const { appBarStyle, menuIconStyle, logoStyle } = AppBarStyle();
    return {
      appBarStyle,
      menuIconStyle,
      logoStyle,
      opened,
      toggleMenu,
      title: computed(() => store.state.title),
      handleLogoutClick: () => {
        handlLogout();
      }
    };
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
    width nav-bar-height
    display flex
    align-items center
    justify-content center
    .nav-menu-icon
      width 20px
      height 20px
      fill white
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
      font-size 20px
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

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
    <div style="flex: 1"></div>

    <div class="menu">
      <div class="avatar-menu">
        <el-dropdown trigger="hover" @command="handleMenuCommand">
          <div class="avatar-wrapper">
            <img
              src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
              class="user-avatar"
            />
          </div>
          <template #dropdown>
            <el-dropdown-menu class="user-dropdown">
              <el-dropdown-item
                v-for="item in menuList"
                :key="item.title"
                :command="item.command"
                :divided="item.divided"
              >
                {{ item.title }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
  <TenantDialog ref="tenantDialogRef" />
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { AppBarStyle } from "@/theme";
import { getSidebarStatus, toggleMenu } from "@/store/composition/app";
import { handlLogout } from "@/store/composition/auth";
// import MenuIcon from "./MenuIcon.vue";
import { useStore } from "@/store";
import { menuList } from "./appBar";
import type { Command } from "./appBar";
import TenantDialog from "./TenantDialog.vue";
import type { API as TenantDialogAPI } from "./TenantDialog.vue";

const store = useStore();
const { opened } = getSidebarStatus(store);
const { appBarStyle, menuIconStyle, logoStyle } = AppBarStyle();

const title = computed(() => store.state.title);

const tenantDialogRef = ref<TenantDialogAPI>();

const handleMenuCommand = (command: Command): void => {
  switch (command.action) {
    case "logout":
      handlLogout();
      break;
    case "tenant":
      tenantDialogRef.value?.show();
      break;
  }
};
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

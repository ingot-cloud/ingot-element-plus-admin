<template>
  <div class="app-bar">
    <div class="menu-icon-container" @click="store.toggleSidebar">
      <!-- <MenuIcon className="menu-icon" :isActive="opened" /> -->
      <ingot-icon icon="nav-menu" className="nav-menu-icon" />
    </div>
    <div class="logo">
      <img class="logo-image" src="@/assets/logo.png" />
      <span class="logo-text">{{ title }}</span>
    </div>
    <IngotSpacer />

    <SwitchDark />

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
import { useAppStore, useAppSidebarStore } from "@/stores/app";
import type { Command, MenuItem } from "@/models/appBar";

defineProps<{
  menuList: Array<MenuItem>;
}>();

const store = useAppSidebarStore();
const title = useAppStore().title;

const handleMenuCommand = (command: Command): void => {
  switch (command.action) {
    case "logout":
      //   handlLogout();
      break;
  }
};
</script>

<style scoped lang="postcss">
.app-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--app-bar-height);
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 4px 0px;
  z-index: 1000 !important;
  border-bottom: 1px solid var(--el-border-color);
  & .menu-icon-container {
    height: var(--app-bar-height);
    width: var(--app-bar-height);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--el-color-primary);
    & .nav-menu-icon {
      width: 20px;
      height: 20px;
      fill: white;
    }
  }
  & .logo {
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: var(--el-color-primary);
    & .logo-image {
      height: 35px;
      width: 35px;
    }
    & .logo-text {
      margin-left: 2px;
      font-size: 20px;
      font-weight: blod;
    }
  }
  & .menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    & .avatar-menu {
      margin-right: 10px;
    }
    & .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 18px;
    }
  }
}
</style>

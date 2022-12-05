<template>
  <div class="app-bar">
    <div class="menu-icon-container" @click="handleMenuIconClick">
      <el-icon class="text-icon cursor-pointer nav-menu-icon">
        <i-ep-expand v-if="getSidebarOpened" />
        <i-ep-fold v-else />
      </el-icon>
    </div>
    <div class="logo">
      <img class="logo-image" src="@/assets/logo.png" />
      <span class="logo-text">{{ title }}</span>
    </div>
    <in-spacer />

    <in-switch-dark />

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
</template>

<script lang="ts" setup>
import { useAppStore, useAppSidebarStore } from "@/stores/app";
import type { Command, MenuItem } from "@/models/appBar";
import { storeToRefs } from "pinia";

defineProps<{
  menuList: Array<MenuItem>;
}>();

const store = useAppSidebarStore();
const { title } = useAppStore();

const { getSidebarOpened } = storeToRefs(store);
const handleMenuIconClick = () => {
  store.toggleSidebar();
};

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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid var(--el-border-color);
  & .menu-icon-container {
    height: var(--app-bar-height);
    width: var(--app-bar-height);
    display: flex;
    justify-content: center;
    align-items: center;
    & .nav-menu-icon {
      color: var(--el-color-primary);
    }
  }
  & .logo {
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

<template>
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
            <Icon mr-2 :icon="item.icon" />
            {{ item.title }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import type { Command } from "./data";
import { menuList } from "./data";

const handleMenuCommand = (command: Command): void => {
  switch (command.action) {
    case "logout":
      break;
  }
};
</script>
<style lang="postcss" scoped>
.avatar-menu {
  margin-right: 10px;
  & .user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 18px;
  }
}
</style>

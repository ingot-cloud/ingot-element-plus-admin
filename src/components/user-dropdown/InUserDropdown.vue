<template>
  <div mr-10px>
    <el-dropdown trigger="hover" @command="handleMenuCommand">
      <div flex flex-row items-center>
        <img
          src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
          h-24px
          w-24px
          mr-8px
          rd-12px
          class="user-avatar"
        />
        <span>{{ getUsername }}</span>
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

  <FixPwdDialog ref="pwdDialogRef" />
</template>
<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import type { UserDropdownCommand } from "./types";
import { menuList } from "./types";
import { useUserInfoStore } from "@/stores/modules/auth";
import { logoutAndReload } from "@/utils/security";
import FixPwdDialog from "./FixPwdDialog.vue";

const pwdDialogRef = ref();
const { getUsername } = storeToRefs(useUserInfoStore());
const handleMenuCommand = (command: UserDropdownCommand): void => {
  switch (command.action) {
    case "fixPwd":
      pwdDialogRef.value.show();
      break;
    case "logout":
      logoutAndReload();
      break;
  }
};
</script>

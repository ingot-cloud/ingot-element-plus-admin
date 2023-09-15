<template>
  <div cursor-pointer>
    <el-dropdown trigger="click" @command="handleMenuCommand">
      <div flex flex-row items-center>
        <img v-if="getAvatar" :src="getAvatar" class="user-avatar" />
        <div v-else class="username-avatar">
          {{ getUsername }}
        </div>
        <in-icon class="avatar-arrow" name="bxs:down-arrow"></in-icon>
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
const { getUsername, getAvatar } = storeToRefs(useUserInfoStore());
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
<style scoped lang="postcss">
.user-avatar {
  @apply h-24px w-24px rd-4px;
}
.username-avatar {
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  border-radius: 4px;
  background: var(--in-color-primary);
  color: white;
  padding-left: 5px;
  padding-right: 5px;
}
.avatar-arrow {
  color: var(--in-color-primary);
  margin-left: 12px;
}
</style>

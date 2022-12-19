<template>
  <div
    class="ingot-menu"
    :class="[
      getMenuOpened ? 'w-[var(--in-menu-show)]' : 'w-[var(--in-menu-hide)]',
    ]"
  >
    <div
      flex
      justify-center
      items-center
      box-border
      class="h-[var(--in-app-bar-height)] b-b b-b-[#414243]"
    >
      <img class="logo-image" src="@/assets/logo.png" />
      <span
        v-if="getMenuOpened"
        m-l-2
        text-5
        font-bold
        truncate
        class="text-[#dadada]"
      >
        {{ app.title }}
      </span>
    </div>
    <el-scrollbar>
      <el-menu
        class="overflow-x-hidden b-r-none!"
        :collapse="!getMenuOpened"
        :default-active="activePath"
        :collapse-transition="false"
        :unique-opened="true"
        router
        @select="onNavMenuSelect"
      >
        <in-submenu
          v-for="route in getMenus"
          :key="route.path"
          :route="route"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAppStore, useAppStateStore } from "@/stores/modules/app";
import { useRouterStore } from "@/stores/modules/router";
import { storeToRefs } from "pinia";

const router = useRouter();
const { getMenuOpened } = storeToRefs(useAppStateStore());
const activePath = computed(() => router.currentRoute.value.path);
const { getMenus } = storeToRefs(useRouterStore());
const { app } = storeToRefs(useAppStore());

const onNavMenuSelect = () => {
  // todo toggleMenu()
};
</script>

<style lang="postcss" scoped>
.ingot-menu {
  @apply flex flex-col h-full transition-width transition-ease transition-duration-300;
  & .el-scrollbar {
    height: calc(100% - var(--in-app-bar-height));
  }
  & .logo-image {
    height: 35px;
    width: 35px;
  }
}
:deep(.el-menu-item.is-active) {
  background: #060708;
  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 4px;
    content: "";
    background: var(--in-color-primary);
  }
}
</style>

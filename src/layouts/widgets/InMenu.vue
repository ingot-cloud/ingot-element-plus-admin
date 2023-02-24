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
import { useAppStore, useAppStateStore } from "@/stores/modules/app";
import { useRouterStore } from "@/stores/modules/router";

const router = useRouter();
const { getMenuOpened } = storeToRefs(useAppStateStore());
let lastActivePath = "/";
const activePath = computed(() => {
  const route = router.currentRoute.value;

  // 如果当前路由需要隐藏菜单
  // 1.展示其父path
  // 2.如果不存在父path，那么展示上一个激活的路由
  if (route.meta.hideMenu) {
    const matched = route.matched;
    if (matched.length > 1) {
      const parent = matched[matched.length - 2];
      return parent.children.find((item) => item.path === parent.redirect)
        ?.path;
    }
    return lastActivePath;
  }
  lastActivePath = route.path;
  return route.path;
});

const { getMenus } = storeToRefs(useRouterStore());
const { app } = storeToRefs(useAppStore());
</script>

<style lang="postcss" scoped>
.ingot-menu {
  @apply flex flex-col h-full transition-width transition-ease transition-duration-300;
  & .el-menu {
    --el-menu-bg-color: var(--in-menu-bg-color);
    --el-menu-hover-bg-color: var(--in-menu-bg-hover-color);
    --el-menu-text-color: var(--in-menu-text-color);
    --el-menu-active-color: var(--in-menu-text-active-color);
    --el-menu-base-level-padding: var(--in-menu-base-level-padding);
  }
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

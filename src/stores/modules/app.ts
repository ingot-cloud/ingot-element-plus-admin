import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import type { AppStore } from "../types";
import type { ComponentSize } from "@/components/cmp-size/types";

/**
 * 全局配置
 */
export const useAppStore = defineStore(
  "app",
  () => {
    const app = reactive<AppStore>({
      title: import.meta.env.VITE_APP_TITLE,
      netConfig: {
        baseURL: import.meta.env.VITE_APP_NET_BASE_URL || undefined,
        timeout: import.meta.env.VITE_APP_NET_DEFAULT_TIMEOUT || 10_000,
        timeoutErrorMessage:
          import.meta.env.VITE_APP_NET_DEFAULT_TIMEOUT_MESSAGE || undefined,
      },
      tenant: import.meta.env.VITE_APP_TENANT,
      basicToken: `Basic ${import.meta.env.VITE_APP_BASIC_TOKEN}`,
    });
    const componentSize = ref<ComponentSize>("default");

    const getTenant = computed(() => app.tenant);
    const getBasicToken = computed(() => app.basicToken);

    const changeComponentSize = (size: ComponentSize) => {
      componentSize.value = size;
    };

    return {
      app,
      componentSize,
      getTenant,
      getBasicToken,
      changeComponentSize,
    };
  },
  {
    persist: {
      storage: localStorage,
      paths: ["componentSize"],
    },
  }
);

/**
 * App 菜单
 */
export const useAppMenuStore = defineStore(
  "app.menu",
  () => {
    const menuOpenStatus = ref(false);
    const getMenuOpened = computed(() => {
      return menuOpenStatus.value;
    });
    const toggleMenu = () => {
      menuOpenStatus.value = !menuOpenStatus.value;
    };
    return { menuOpenStatus, getMenuOpened, toggleMenu };
  },
  {
    persist: {
      storage: localStorage,
      paths: ["menuOpenStatus"],
    },
  }
);

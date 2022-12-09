import { ref, reactive, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";
import type { AppStore } from "../types";

/**
 * 全局配置
 */
export const useAppStore = defineStore("app", () => {
  const app = reactive<AppStore>({
    title: import.meta.env.VITE_APP_TITLE,
    componentSize: "default",
    netConfig: {
      baseURL: import.meta.env.VITE_APP_NET_BASE_URL || undefined,
      timeout: import.meta.env.VITE_APP_NET_DEFAULT_TIMEOUT || 10_000,
      timeoutErrorMessage:
        import.meta.env.VITE_APP_NET_DEFAULT_TIMEOUT_MESSAGE || undefined,
    },
    tenant: import.meta.env.VITE_APP_TENANT,
  });

  const getTenant = computed(() => app.tenant);

  return { app, getTenant };
});

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
    function toggleMenu() {
      menuOpenStatus.value = !menuOpenStatus.value;
    }
    return { menuOpenStatus, getMenuOpened, toggleMenu };
  },
  {
    persist: {
      storage: localStorage,
      paths: ["menuOpenStatus"],
    },
  }
);

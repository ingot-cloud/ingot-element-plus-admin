import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { StoreManager } from "@/utils/storage";
import { StoreType } from "@/models/storage";
import type { AppStore } from "../types";

const KEY_SIDEBAR_OPEN = "menu.open";

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
  });
  return { app };
});

/**
 * App 菜单
 */
export const useAppMenuStore = defineStore(
  "app.menu",
  () => {
    const menuOpenStatus = ref(false);
    const getMenuOpened = computed(() => {
      const value = StoreManager.get(KEY_SIDEBAR_OPEN, StoreType.Session);
      if (value) {
        menuOpenStatus.value = value === "1";
      }
      return menuOpenStatus.value;
    });
    function toggleMenu() {
      menuOpenStatus.value = !menuOpenStatus.value;
      StoreManager.set({
        key: KEY_SIDEBAR_OPEN,
        value: menuOpenStatus.value ? "1" : "0",
        type: StoreType.Session,
      });
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

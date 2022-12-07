import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { StoreManager } from "@/utils/storage";
import { StoreType } from "@/models/storage";
import type { AppStore } from "../types";

const KEY_SIDEBAR_OPEN = "sidebarOpen";

/**
 * 全局配置
 */
export const useAppStore = defineStore("app", () => {
  const app = reactive<AppStore>({
    title: import.meta.env.VITE_APP_TITLE,
    componentSize: "default",
  });
  return { app };
});

/**
 * App 菜单
 */
export const useAppMenuStore = defineStore("app.menu", () => {
  const sidebarOpened = ref(false);
  const getMenuOpened = computed(() => {
    const value = StoreManager.get(KEY_SIDEBAR_OPEN, StoreType.Session);
    if (value) {
      sidebarOpened.value = value === "1";
    }
    return sidebarOpened.value;
  });
  function toggleMenu() {
    sidebarOpened.value = !sidebarOpened.value;
    StoreManager.set({
      key: KEY_SIDEBAR_OPEN,
      value: sidebarOpened.value ? "1" : "0",
      type: StoreType.Session,
    });
  }

  return { sidebarOpened, getMenuOpened, toggleMenu };
});

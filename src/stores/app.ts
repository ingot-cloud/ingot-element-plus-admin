import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { StoreManager } from "@/utils/storage";
import { StoreType } from "@/models/storage";

const KEY_SIDEBAR_OPEN = "sidebarOpen";

export const useAppStore = defineStore("app", () => {
  const sidebarOpened = ref(false);
  const getSidebarOpened = computed(() => {
    const value = StoreManager.get(KEY_SIDEBAR_OPEN, StoreType.Session);
    if (value) {
      sidebarOpened.value = value === "1";
    }
    return sidebarOpened.value;
  });
  function toggleSidebar() {
    sidebarOpened.value = !sidebarOpened.value;
    StoreManager.set({
      key: KEY_SIDEBAR_OPEN,
      value: sidebarOpened.value ? "1" : "0",
      type: StoreType.Session,
    });
  }

  return { sidebarOpened, getSidebarOpened, toggleSidebar };
});

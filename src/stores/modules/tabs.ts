import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import type { TabItem } from "../types";
import router from "@/router";

export const useTabsStore = defineStore("tabs", () => {
  const tabs = ref<TabItem[]>([]);

  const addTab = (tab: TabItem) => {
    if (tabs.value.some((item) => item.path === tab.path)) {
      return;
    }
    tabs.value.push(tab);
  };

  const removeTab = (path: string, isCurrent = true) => {
    const idx = tabs.value.findIndex(
      (item) => item.close && item.path === path
    );
    if (idx < 0) {
      return;
    }
    if (isCurrent) {
      const newTab = tabs.value[idx + 1] || tabs.value[idx - 1];
      if (!newTab) {
        return;
      }
      router.push(newTab.path);
    }

    tabs.value.splice(idx, 1);
  };

  return {
    tabs,
    addTab,
    removeTab,
  };
});

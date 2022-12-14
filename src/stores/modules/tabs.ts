import { ref, unref, computed } from "vue";
import { defineStore } from "pinia";
import type { TabItem } from "../types";
import router from "@/router";
import { useRefreshPage } from "@/helper/web/usePage";

export const useTabsStore = defineStore("tabs", () => {
  const tabs = ref<TabItem[]>([]);
  const cacheTabList = ref<Set<string>>(new Set());

  /**
   * 添加Tab
   * @param tab {@link TabItem}
   */
  const addTab = (tab: TabItem) => {
    if (tabs.value.some((item) => item.path === tab.path)) {
      return;
    }
    tabs.value.push(tab);
  };

  /**
   * 移除tab
   * @param path 路径
   * @param isCurrent 是否为当前tab
   */
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

  /**
   * 移除其它tabs
   * @param path 当前tab path
   */
  const closeOtherTabs = (path: string) => {
    console.log(1, path);
    tabs.value = tabs.value.filter((item) => item.path === path || !item.close);
  };

  /**
   * 刷新页面
   */
  const refreshPage = async () => {
    const { currentRoute } = router;
    const route = unref(currentRoute);
    const name = route.name;

    const findTab = Array.from(cacheTabList.value).find(
      (item) => item === name
    );
    if (findTab) {
      cacheTabList.value.delete(findTab);
    }
    const refreshPage = useRefreshPage(router);
    await refreshPage();
  };

  return {
    tabs,
    addTab,
    removeTab,
    closeOtherTabs,
    refreshPage,
  };
});

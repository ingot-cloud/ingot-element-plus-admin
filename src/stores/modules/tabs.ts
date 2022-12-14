import { ref, unref, computed } from "vue";
import { defineStore } from "pinia";
import type { TabItem } from "../types";
import router from "@/router";
import { useRoute } from "vue-router";
import { useGo, useRefreshPage } from "@/helper/web/usePage";
import { PagePathEnum } from "@/enums/pageEnums";

export const useTabsStore = defineStore(
  "tabs",
  () => {
    const tabs = ref<TabItem[]>([]);
    const cacheTabList = ref<Set<string>>(new Set());

    const getCanCloseOtherTabs = computed(() => {
      const route = useRoute();
      const size = tabs.value.filter(
        (item) => item.path !== route.path && item.close
      ).length;
      return size !== 0;
    });
    const getCanCloseAllTabs = computed(() => {
      const size = tabs.value.filter((item) => item.close).length;
      return size !== 0;
    });

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
        const go = useGo(router);
        go(newTab.path);
      }

      tabs.value.splice(idx, 1);
    };

    /**
     * 移除其它tabs
     * @param path 当前tab path
     */
    const closeOtherTabs = (path: string) => {
      tabs.value = tabs.value.filter(
        (item) => item.path === path || !item.close
      );
    };

    /**
     * 关闭所有tabs
     * @param path 当前路径
     */
    const closeAllTabs = (path: string) => {
      tabs.value = tabs.value.filter((item) => !item.close);
      const go = useGo(router);
      // 所有都关闭后，重定向到home
      if (tabs.value.length === 0) {
        go(PagePathEnum.HOME, true);
      } else {
        const idx = tabs.value.findIndex((item) => item.path === path);
        if (idx > -1) {
          return;
        }
        go(tabs.value[0].path);
      }
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
      getCanCloseOtherTabs,
      getCanCloseAllTabs,
      addTab,
      removeTab,
      closeOtherTabs,
      closeAllTabs,
      refreshPage,
    };
  },
  {
    persist: {
      storage: sessionStorage,
      paths: ["tabs"],
    },
  }
);

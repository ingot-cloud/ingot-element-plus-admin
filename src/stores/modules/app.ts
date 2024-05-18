import type { AppStore } from "../types";
import type { ComponentSize } from "@/layouts/widgets/cmp-size/types";

/**
 * 全局配置
 */
export const useAppStore = defineStore("app", () => {
  const now = new Date();
  const app = reactive<AppStore>({
    title: import.meta.env.VITE_APP_TITLE,
    copyright: import.meta.env.VITE_APP_COPYRIGHT.replace(
      "{0}",
      now.getFullYear() + ""
    ),
    login: {
      clientId: import.meta.env.VITE_APP_LOGIN_CLIENT_ID,
      scope: import.meta.env.VITE_APP_LOGIN_SCOPE,
      loginUri: import.meta.env.VITE_APP_LOGIN_URI,
      loginCallbackUri: import.meta.env.VITE_APP_LOGIN_CALLBACK_URI,
      errorImage: import.meta.env.VITE_APP_ERROR_IMAGE,
    },
    netConfig: {
      baseURL: import.meta.env.VITE_APP_NET_BASE_URL || undefined,
      timeout: import.meta.env.VITE_APP_NET_DEFAULT_TIMEOUT || 10_000,
      timeoutErrorMessage:
        import.meta.env.VITE_APP_NET_DEFAULT_TIMEOUT_MESSAGE || undefined,
    },
    basicToken: `Basic ${import.meta.env.VITE_APP_BASIC_TOKEN}`,
    bucketName: import.meta.env.VITE_APP_BUCKET_NAME,
  });

  const getBasicToken = computed(() => app.basicToken);

  return {
    app,
    getBasicToken,
  };
});

/**
 * app状态
 */
export const useAppStateStore = defineStore(
  "app.state",
  () => {
    const menuOpenStatus = ref(true);
    const componentSize = ref<ComponentSize>("default");
    const showTabs = ref(false);
    const showBreadcrumb = ref(true);
    const showCopyright = ref(true);
    const showSearch = ref(true);

    const getMenuOpened = computed(() => {
      return menuOpenStatus.value;
    });
    const getShowTabs = computed(() => {
      return showTabs.value;
    });
    const getShowBreadcrumb = computed(() => {
      return showBreadcrumb.value;
    });
    const getShowCopyright = computed(() => {
      return showCopyright.value;
    });
    const getShowSearch = computed(() => {
      return showSearch.value;
    });

    const toggleMenu = () => {
      menuOpenStatus.value = !menuOpenStatus.value;
    };
    const changeComponentSize = (size: ComponentSize) => {
      componentSize.value = size;
    };

    return {
      menuOpenStatus,
      componentSize,
      showTabs,
      showBreadcrumb,
      showCopyright,
      showSearch,
      getMenuOpened,
      getShowTabs,
      getShowBreadcrumb,
      getShowCopyright,
      getShowSearch,
      toggleMenu,
      changeComponentSize,
    };
  },
  {
    persist: {
      storage: localStorage,
      paths: ["menuOpenStatus", "componentSize", "showTabs", "showBreadcrumb"],
    },
  }
);

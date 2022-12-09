import { reactive, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";
import type { UserToken } from "@/models/security";

export const useAuthStore = defineStore(
  "security",
  () => {
    const token = reactive<UserToken>({});

    const getAccessToken = computed(() => {
      if (token.accessToken && token.tokenType) {
        return `${token.tokenType} ${token.accessToken}`;
      }
      return "";
    });

    const updateToken = (value: UserToken) => {
      Object.assign(token, value);
    };

    return { token, getAccessToken, updateToken };
  },
  {
    persist: {
      storage: localStorage,
      paths: ["token"],
    },
  }
);

export const getAccessToken = storeToRefs(useAuthStore()).getAccessToken;

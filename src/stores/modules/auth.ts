import { reactive, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";
import type { UserToken } from "@/models/security";
import { LoginAPI } from "@/api/common/auth";

/**
 * 授权信息
 */
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

    const getRefreshToken = computed(() => {
      return token.refreshToken || "";
    });

    // 更新 token
    const updateToken = (value: UserToken) => {
      Object.assign(token, value);
    };

    // 登录
    const login = ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }): Promise<void> => {
      return new Promise((resolve, reject) => {
        LoginAPI({
          username,
          password,
        })
          .then((response) => {
            updateToken(response.data);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    };

    return { token, getAccessToken, getRefreshToken, updateToken, login };
  },
  {
    persist: {
      storage: localStorage,
      paths: ["token"],
    },
  }
);

/**
 * 获取请求token
 */
export const getAccessToken = storeToRefs(useAuthStore()).getAccessToken;

/**
 * 获取刷新token
 */
export const getRefreshToken = storeToRefs(useAuthStore()).getRefreshToken;

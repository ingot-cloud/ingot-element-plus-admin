import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import type { UserToken, UserInfo } from "@/models/security";
import { PasswordTokenAPI } from "@/api/common/auth";
import { UserInfoAPI } from "@/api/common/user";
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
        PasswordTokenAPI({
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
 * 用户信息
 */
export const useUserInfoStore = defineStore("security.user", () => {
  const userInfo = reactive<UserInfo>({
    user: {
      username: "欢迎登录",
    },
    roles: [],
  });

  const getUsername = computed(() => userInfo.user.username);
  const getRoles = computed(() => userInfo.roles);
  const getUserInfoWhetherExist = computed(
    () => userInfo.roles && userInfo.roles.length !== 0
  );

  const fetchUserInfo = () => {
    return new Promise((resolve, reject) => {
      UserInfoAPI()
        .then((response) => {
          Object.assign(userInfo, response.data);
          resolve(response.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

  return {
    userInfo,
    getUsername,
    getRoles,
    getUserInfoWhetherExist,
    fetchUserInfo,
  };
});

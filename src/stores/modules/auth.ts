import type { UserToken, UserInfo } from "@/models/security";
import {
  PasswordTokenAPI,
  RefreshTokenAPI,
  RevokeTokenAPI,
} from "@/api/common/auth";
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

    /**
     * 刷新token
     */
    const refreshToken = (): Promise<UserToken> => {
      return new Promise((resolve, reject) => {
        RefreshTokenAPI(getRefreshToken.value)
          .then((response) => {
            updateToken(response.data);
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    };

    /**
     * 退出登录
     */
    const logout = (): Promise<void> => {
      return new Promise((resolve) => {
        RevokeTokenAPI(getAccessToken.value);
        updateToken({
          accessToken: undefined,
          tokenType: undefined,
          refreshToken: undefined,
          expiresIn: undefined,
          scope: undefined,
        });
        useUserInfoStore().clear();
        resolve();
      });
    };

    return {
      token,
      getAccessToken,
      getRefreshToken,
      updateToken,
      login,
      refreshToken,
      logout,
    };
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
  const defaultUser = {
    user: undefined,
    roles: [],
  };
  const userInfo = reactive<UserInfo>(defaultUser);

  const getUsername = computed(() => {
    return userInfo.user ? userInfo.user.realName : "欢迎登录";
  });
  const getRoles = computed(() => userInfo.roles);
  const getUserInfoWhetherExist = computed(
    () => userInfo.roles && userInfo.roles.length !== 0
  );

  const clear = () => {
    Object.assign(userInfo, { user: undefined, roles: [] });
  };

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
    clear,
    fetchUserInfo,
  };
});

import { Module } from "vuex";
import { AuthModuleState, RootState, UserInfo, UserToken } from "@/core/model";
import { CookieManager } from "@/core/storage/cookie";
import { CookieConfig } from "@/config";

enum Key {
  Token = "token",
  TokenType = "tokenType",
  RefreshToken = "refreshToken"
}

const defaultToken = {
  accessToken: "",
  tokenType: "",
  refreshToken: "",
  expiresIn: 0,
  scope: ""
};
const defaultUser = {
  username: ""
};

const authModule: Module<AuthModuleState, RootState> = {
  state: {
    token: defaultToken,
    user: defaultUser,
    roles: []
  },
  getters: {
    accessToken(state) {
      if (!state.token.accessToken || state.token.accessToken.length === 0) {
        const value = CookieManager.get(Key.Token);
        if (value) {
          try {
            state.token = JSON.parse(value);
          } catch (e) {
            state.token = defaultToken;
          }
        }
      }
      return state.token.accessToken;
    },
    refreshToken(state) {
      if (!state.token.refreshToken || state.token.refreshToken.length === 0) {
        const value = CookieManager.get(Key.RefreshToken);
        if (value) {
          state.token.refreshToken = value;
        }
      }
      return state.token.refreshToken;
    }
  },
  mutations: {
    setToken(state, token: UserToken) {
      state.token = token;
      // 保存 token
      const accessToken = Object.assign({}, token);
      accessToken.refreshToken = "";
      CookieManager.set({
        key: Key.Token,
        value: accessToken,
        expires: token.expiresIn
      });
      // 保存 refreshToken, 默认保存7天
      CookieManager.set({
        key: Key.RefreshToken,
        value: token.refreshToken,
        expires: CookieConfig.RefreshTokenDefaultExpireTime
      });
    },
    setUserInfo(state, info: UserInfo) {
      state.user = info.user;
      state.roles = info.roles;
    },
    removeToken(state) {
      state.token = defaultToken;
      CookieManager.remove(Key.Token);
      CookieManager.remove(Key.RefreshToken);
    },
    removeUserInfo(state) {
      state.user = defaultUser;
      state.roles = [];
    }
  },
  actions: {
    updateToken({ commit }, token: UserToken) {
      commit("setToken", token);
    },
    fetchUser() {
      //
    },
    clear({ commit }) {
      return new Promise<void>(resolve => {
        commit("removeToken");
        commit("removeUserInfo");
        resolve();
      });
    }
  }
};

export default authModule;

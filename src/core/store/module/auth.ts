import { Module } from "vuex";
import {
  AuthModuleState,
  RootState,
  StoreType,
  UserInfo,
  UserToken
} from "@/core/model";
import { StoreManager } from "@/core/storage/store";
import { getUserInfo } from "@/core/api/user";
import { refreshToken } from "@/core/api/auth";

enum Key {
  Token = "token",
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
        const value = StoreManager.get(Key.Token, StoreType.Session);
        if (value) {
          state.token = value;
        }
      }
      return state.token.accessToken;
    },
    refreshToken(state) {
      if (!state.token.refreshToken || state.token.refreshToken.length === 0) {
        const value = StoreManager.get(Key.RefreshToken, StoreType.Session);
        if (value) {
          state.token.refreshToken = value;
        }
      }
      return state.token.refreshToken;
    },
    existUserInfo(state) {
      return state.roles.length !== 0;
    }
  },
  mutations: {
    setToken(state, token: UserToken) {
      state.token = token;
      // 保存 token
      const accessToken = Object.assign({}, token);
      accessToken.refreshToken = "";
      StoreManager.set({
        key: Key.Token,
        value: accessToken,
        type: StoreType.Session
      });
      // 保存 refreshToken
      StoreManager.set({
        key: Key.RefreshToken,
        value: token.refreshToken,
        type: StoreType.Session
      });
    },
    setUserInfo(state, info: UserInfo) {
      state.user = info.user;
      state.roles = info.roles;
    },
    removeToken(state) {
      state.token = defaultToken;
      StoreManager.remove(Key.Token, StoreType.Session);
      StoreManager.remove(Key.RefreshToken, StoreType.Session);
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
    refreshToken({ getters, commit }) {
      return new Promise((resolve, reject) => {
        const refreshTokenValue = getters.refreshToken;
        if (!refreshTokenValue) {
          reject();
          return;
        }
        refreshToken(refreshTokenValue)
          .then(response => {
            commit("setToken", response.data);
            resolve(response.data);
          })
          .catch(() => {
            reject();
          });
      });
    },
    fetchUserInfo({ commit }) {
      return new Promise<UserInfo>((resolve, reject) => {
        getUserInfo()
          .then(response => {
            const userInfo = response.data;
            commit("setUserInfo", userInfo);
            resolve(userInfo);
          })
          .catch(e => {
            reject(e);
          });
      });
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

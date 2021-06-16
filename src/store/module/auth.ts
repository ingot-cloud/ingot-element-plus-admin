import { Module } from "vuex";
import { StoreType, UserInfo, UserToken } from "@/model";
import { AuthModuleState, RootState } from "@/store/types";
import { StoreManager } from "@/utils/store";
import { getUserInfo } from "@/api/base/user";
import { refreshToken } from "@/api/base/auth";
import { Mutations, Getters, Actions } from "@/store/constants/auth";

export { moduleName } from "@/store/constants/auth";

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
  namespaced: true,
  state: {
    token: defaultToken,
    user: defaultUser,
    roles: []
  },
  getters: {
    [`${Getters.accessToken}`](state) {
      if (!state.token.accessToken || state.token.accessToken.length === 0) {
        const value = StoreManager.get(Key.Token, StoreType.Session);
        if (value) {
          state.token = value;
        }
      }
      return state.token.accessToken;
    },
    [`${Getters.refreshToken}`](state) {
      if (!state.token.refreshToken || state.token.refreshToken.length === 0) {
        const value = StoreManager.get(Key.RefreshToken, StoreType.Session);
        if (value) {
          state.token.refreshToken = value;
        }
      }
      return state.token.refreshToken;
    },
    [`${Getters.existUserInfo}`](state) {
      return state.roles.length !== 0;
    }
  },
  mutations: {
    [`${Mutations.setToken}`](state, token: UserToken) {
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
    [`${Mutations.setUserInfo}`](state, info: UserInfo) {
      state.user = info.user;
      state.roles = info.roles;
    },
    [`${Mutations.removeToken}`](state) {
      state.token = defaultToken;
      StoreManager.remove(Key.Token, StoreType.Session);
      StoreManager.remove(Key.RefreshToken, StoreType.Session);
    },
    [`${Mutations.removeUserInfo}`](state) {
      state.user = defaultUser;
      state.roles = [];
    }
  },
  actions: {
    [`${Actions.updateToken}`]({ commit }, token: UserToken) {
      commit("setToken", token);
    },
    [`${Actions.refreshToken}`]({ getters, commit }) {
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
    [`${Actions.fetchUserInfo}`]({ commit }) {
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
    [`${Actions.clear}`]({ commit }) {
      return new Promise<void>(resolve => {
        commit("removeToken");
        commit("removeUserInfo");
        resolve();
      });
    }
  }
};

export default authModule;

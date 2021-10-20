import { Module } from "vuex";
import { StoreType, UserInfo, UserToken } from "@/model";
import { AuthModuleState, RootState } from "@/store/types";
import { StoreManager } from "@/utils/store";
import { getUserInfo } from "@/api/base/user";
import { refreshToken, revoke } from "@/api/base/auth";
import { Mutations, Getters, Actions } from "@/store/constants/auth";

export { moduleName } from "@/store/constants/auth";

enum Key {
  Token = "token",
  RefreshToken = "refreshToken",
  LoginTenant = "loginTenant",
}

const defaultToken = {
  accessToken: "",
  tokenType: "",
  refreshToken: "",
  expiresIn: 0,
  scope: "",
};
const defaultUser = {
  username: "",
};

const authModule: Module<AuthModuleState, RootState> = {
  namespaced: true,
  state: {
    loginTenant: "",
    token: defaultToken,
    user: defaultUser,
    roles: [],
  },
  getters: {
    [`${Getters.loginTenant}`](state) {
      if (!state.loginTenant || state.loginTenant.length === 0) {
        const value = StoreManager.get(Key.LoginTenant, StoreType.Session);
        if (value) {
          state.loginTenant = value;
        }
      }
      return state.loginTenant;
    },
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
    },
  },
  mutations: {
    [`${Mutations.setLoginTenant}`](state, tenantId: string) {
      state.loginTenant = tenantId;
      StoreManager.set({
        key: Key.LoginTenant,
        value: tenantId,
        type: StoreType.Session,
      });
    },
    [`${Mutations.setToken}`](state, token: UserToken) {
      state.token = token;
      // 保存 token
      const accessToken = Object.assign({}, token);
      accessToken.refreshToken = "";
      StoreManager.set({
        key: Key.Token,
        value: accessToken,
        type: StoreType.Session,
      });
      // 保存 refreshToken
      StoreManager.set({
        key: Key.RefreshToken,
        value: token.refreshToken,
        type: StoreType.Session,
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
      StoreManager.remove(Key.LoginTenant, StoreType.Session);
    },
    [`${Mutations.removeUserInfo}`](state) {
      state.user = defaultUser;
      state.roles = [];
    },
  },
  actions: {
    [`${Actions.updateToken}`]({ commit }, token: UserToken) {
      commit(Mutations.setToken, token);
    },
    [`${Actions.refreshToken}`]({ getters, commit }) {
      return new Promise((resolve, reject) => {
        const refreshTokenValue = getters.refreshToken;
        if (!refreshTokenValue) {
          reject();
          return;
        }
        refreshToken(refreshTokenValue)
          .then((response) => {
            commit(Mutations.setToken, response.data);
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
          .then((response) => {
            const userInfo = response.data;
            commit(Mutations.setUserInfo, userInfo);
            resolve(userInfo);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    [`${Actions.clear}`]({ commit }) {
      return new Promise<void>((resolve) => {
        const doResult = () => {
          commit(Mutations.removeToken);
          commit(Mutations.removeUserInfo);
          resolve();
        };
        revoke().then(doResult).catch(doResult);
      });
    },
  },
};

export default authModule;

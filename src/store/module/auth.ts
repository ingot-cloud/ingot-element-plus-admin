import { Module } from "vuex";
import { AuthModuleState, RootState, User, UserToken } from "@/types";
import { CookieManager } from "@/core/storage/cookie";

enum Key {
  Token = "token",
  TokenType = "tokenType"
}

const authModule: Module<AuthModuleState, RootState> = {
  state: {
    token: {
      accessToken: "",
      tokenType: "",
      refreshToken: "",
      expiresIn: 0,
      scope: ""
    },
    user: {
      username: ""
    },
    roles: []
  },
  getters: {
    getToken(state) {
      if (!state.token.accessToken || state.token.accessToken.length === 0) {
        const value = CookieManager.get(Key.Token);
        if (value) {
          state.token = JSON.parse(value);
        }
      }
      return state.token.accessToken;
    }
  },
  mutations: {
    setToken(state, token: UserToken) {
      state.token = token;
    },
    setUser(state, user: User) {
      state.user = user;
    },
    setRoles(state, roles: Array<string>) {
      state.roles = roles;
    }
  },
  actions: {
    fetchToken() {
      //
    },
    fetchUser() {
      //
    }
  }
};

export default authModule;

import { Module } from "vuex";
import { AuthModuleState, RootState, User, UserToken } from "@/types";
import { CookieManager } from "@/core/storage/cookie";

enum Key {
  Token = "token",
  TokenType = "tokenType"
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
    fetchUser() {
      //
    }
  }
};

export default authModule;

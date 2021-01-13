import { Module } from "vuex";
import { AuthModuleState, RootState, User, UserToken } from "@/store/types";

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

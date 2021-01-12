import { Module } from "vuex";
import { RootState, AppModuleState } from "../types";

const appModule: Module<AppModuleState, RootState> = {
  state: {
    sidebar: {
      opened: false
    }
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebar.opened = !state.sidebar.opened;
    }
  },
  actions: {
    toggleSidebar({ commit }) {
      commit("toggleSidebar");
    }
  }
};

export default appModule;

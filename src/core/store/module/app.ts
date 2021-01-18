import { Module } from "vuex";
import { RootState, AppModuleState } from "@/core/model";

const appModule: Module<AppModuleState, RootState> = {
  state: {
    sidebar: {
      opened: true
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

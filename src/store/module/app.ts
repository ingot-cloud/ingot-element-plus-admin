import { Module } from "vuex";
import { RootState, AppModuleState } from "@/store/types";

const appModule: Module<AppModuleState, RootState> = {
  state: {
    sidebar: {
      // 默认关闭
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

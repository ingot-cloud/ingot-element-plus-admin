import { Module } from "vuex";
import { RootState, AppModuleState } from "../types";

const appModule: Module<AppModuleState, RootState> = {
  state: {
    sidebar: {
      opened: false,
      withoutAnimation: false
    }
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
    },
    closeSidebar(state, withoutAnimation: boolean) {
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation;
    }
  },
  actions: {
    toggleSidebar({ commit }) {
      commit("toggleSidebar");
    },
    closeSidebar({ commit }, withoutAnimation: boolean) {
      commit("closeSidebar", withoutAnimation);
    }
  }
};

export default appModule;

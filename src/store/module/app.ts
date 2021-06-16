import { Module } from "vuex";
import { RootState, AppModuleState } from "@/store/types";
import { StoreType } from "@/model";
import { StoreManager } from "@/utils/store";
import { Mutations, Getters, Actions } from "@/store/constants/app";

export { moduleName } from "@/store/constants/app";

const SidebarOpenKey = "sidebarOpenStatus";

const appModule: Module<AppModuleState, RootState> = {
  namespaced: true,
  state: {
    sidebar: {
      // 默认关闭
      opened: false
    }
  },
  getters: {
    [`${Getters.sidebarOpened}`]: state => {
      const value = StoreManager.get(SidebarOpenKey, StoreType.Session);
      if (value) {
        state.sidebar.opened = value === "1";
      }
      return state.sidebar.opened;
    }
  },
  mutations: {
    [`${Mutations.toggleSidebar}`](state) {
      state.sidebar.opened = !state.sidebar.opened;
      StoreManager.set({
        key: SidebarOpenKey,
        value: state.sidebar.opened ? "1" : "0",
        type: StoreType.Session
      });
    }
  },
  actions: {
    [`${Actions.toggleSidebar}`]({ commit }) {
      commit("toggleSidebar");
    }
  }
};

export default appModule;

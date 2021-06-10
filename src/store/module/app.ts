import { Module } from "vuex";
import { RootState, AppModuleState } from "@/store/types";
import { StoreType } from "@/model";
import { StoreManager } from "@/utils/store";

const SidebarOpenKey = "sidebarOpenStatus";

const appModule: Module<AppModuleState, RootState> = {
  state: {
    sidebar: {
      // 默认关闭
      opened: false
    }
  },
  getters: {
    sidebarOpened: state => {
      const value = StoreManager.get(SidebarOpenKey, StoreType.Session);
      if (value) {
        state.sidebar.opened = value === "1";
      }
      return state.sidebar.opened;
    }
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebar.opened = !state.sidebar.opened;
      StoreManager.set({
        key: SidebarOpenKey,
        value: state.sidebar.opened ? "1" : "0",
        type: StoreType.Session
      });
    }
  },
  actions: {
    toggleSidebar({ commit }) {
      commit("toggleSidebar");
    }
  }
};

export default appModule;

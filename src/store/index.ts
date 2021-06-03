import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import coreModules from "@/store/module";
import modules from "./module";
import { AllState, RootState } from "@/model";

export const store = createStore<RootState>({
  state: {
    title: "Ingot Cloud",
    theme: "Default"
  },
  mutations: {},
  actions: {},
  modules: {
    ...modules,
    ...coreModules
  }
});

export const key: InjectionKey<Store<RootState>> = Symbol("storeKey");

// define own `useStore` composition function
export function useStore() {
  return baseUseStore<AllState>(key);
}

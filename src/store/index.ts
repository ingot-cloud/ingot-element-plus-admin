import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import modules from "./module";
import { AllState, RootState } from "@/store/types";

export const store = createStore<RootState>({
  state: {
    title: "Ingot Cloud",
    theme: "Default"
  },
  mutations: {},
  actions: {},
  modules: {
    ...modules
  }
});

export const key: InjectionKey<Store<RootState>> = Symbol("storeKey");

// define own `useStore` composition function
export function useStore() {
  return baseUseStore<AllState>(key);
}

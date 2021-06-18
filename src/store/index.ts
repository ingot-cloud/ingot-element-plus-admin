import { InjectionKey, computed, ComputedRef } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import modules from "./module";
import { AllState, RootState } from "@/store/types";

export const store = createStore<RootState>({
  state: {
    title: "Ingot Cloud",
    theme: "Default",
  },
  mutations: {},
  actions: {},
  modules: {
    ...modules,
  },
});

export type IngotStore = Store<RootState>;

export const key: InjectionKey<Store<RootState>> = Symbol("storeKey");

// define own `useStore` composition function
export function useStore(): Store<AllState> {
  return baseUseStore<AllState>(key);
}

// useDispatch
export function useDispatch(
  storeOrNamespace: Store<RootState> | string,
  namespaceOrAction: string,
  actionOrPayload?: string | any,
  payload?: any | undefined
): Promise<any> {
  let store: Store<RootState>;
  let namespace: string;
  let action: string;
  if (storeOrNamespace instanceof Store) {
    store = storeOrNamespace;
    namespace = namespaceOrAction;
    action = actionOrPayload;
  } else {
    switch (arguments.length) {
      case 2:
        store = useStore();
        namespace = storeOrNamespace as string;
        action = namespaceOrAction;
        break;
      case 3:
        store = useStore();
        namespace = storeOrNamespace as string;
        action = namespaceOrAction;
        payload = actionOrPayload;
        break;
      default:
        console.debug(`useDispatch 参数异常, 参数数量非法=${arguments.length}`);
        return Promise.resolve();
    }
  }
  return store.dispatch(`${namespace}/${action}`, payload);
}

// useCommit
export function useCommit(
  storeOrNamespace: Store<RootState> | string,
  namespaceOrType: string,
  typeOrPayload?: string | any,
  payload?: any | undefined
): void {
  let store: Store<RootState>;
  let namespace: string;
  let type: string;
  if (storeOrNamespace instanceof Store) {
    store = storeOrNamespace;
    namespace = namespaceOrType;
    type = typeOrPayload;
  } else {
    switch (arguments.length) {
      case 2:
        store = useStore();
        namespace = storeOrNamespace as string;
        type = namespaceOrType;
        break;
      case 3:
        store = useStore();
        namespace = storeOrNamespace as string;
        type = namespaceOrType;
        payload = typeOrPayload;
        break;
      default:
        console.debug(`useCommit 参数异常, 参数数量非法=${arguments.length}`);
        return;
    }
  }
  store.commit(`${namespace}/${type}`, payload);
}

// getter
export function getter<T = any>(
  storeOrNamespace: Store<RootState> | string,
  namespaceOrGet: string,
  get?: string
): T {
  let store: Store<RootState>;
  let namespace: string;
  if (!get) {
    store = useStore();
    namespace = storeOrNamespace as string;
    get = namespaceOrGet;
  } else {
    store = storeOrNamespace as Store<RootState>;
    namespace = namespaceOrGet;
  }
  return store.getters[`${namespace}/${get}`];
}

// computer getter
export function computedGetter<T = any>(
  storeOrNamespace: Store<RootState> | string,
  namespaceOrGet: string,
  get?: string
): ComputedRef<T> {
  return computed<T>(() => getter<T>(storeOrNamespace, namespaceOrGet, get));
}

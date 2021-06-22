import { Module } from "vuex";
import { RootState, TenantModuleState } from "@/store/types";
import {
  tenantPage,
  create,
  update,
  remove,
  list,
} from "@/api/authority/tenant";
import { Page, RolePageItemVo, SysTenant, StoreType } from "@/model";
import { StoreManager } from "@/utils/store";
import { Mutations, Actions, Getters } from "@/store/constants/tenant";

export { moduleName } from "@/store/constants/tenant";

const GlobalTenantKey = "tenant";

const module: Module<TenantModuleState, RootState> = {
  namespaced: true,
  state: {
    globalTenant: "",
    simpleRecords: [],
    records: [],
    current: 1,
    size: 1000, // 租户不进行分页，默认获取1000条
    update: true,
  },
  mutations: {
    [`${Mutations.setGlobalTenant}`](state, tenant) {
      state.globalTenant = tenant;
      StoreManager.set({
        key: GlobalTenantKey,
        value: tenant,
        type: StoreType.Session,
      });
    },
    [`${Mutations.setSimpleRecords}`](state, records) {
      state.simpleRecords = records;
    },
    [`${Mutations.setRecords}`](state, records) {
      state.update = false;
      state.records = records;
    },
    [`${Mutations.openUpdateFlag}`](state) {
      state.update = true;
    },
  },
  getters: {
    [`${Getters.globalTenant}`]: (state) => {
      if (!state.globalTenant || state.globalTenant.length === 0) {
        const value = StoreManager.get(GlobalTenantKey, StoreType.Session);
        if (value) {
          state.globalTenant = value;
        }
      }
      return state.globalTenant;
    },
    [`${Getters.simpleRecords}`]: (state) => state.simpleRecords,
    [`${Getters.records}`]: (state) => state.records,
  },
  actions: {
    [`${Actions.clearGlobalTenant}`]({ commit }) {
      commit(Mutations.setGlobalTenant, "");
    },
    [`${Actions.fetchSimpleList}`]({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (!state.update && state.simpleRecords.length !== 0) {
          resolve(state.simpleRecords);
          return;
        }

        list()
          .then((response) => {
            commit(Mutations.setSimpleRecords, response.data);
            resolve(response.data);
          })
          .catch(() => {
            reject();
          });
      });
    },
    [`${Actions.fetchData}`](
      { state, commit, getters },
      condition?: SysTenant
    ) {
      return new Promise<Page<RolePageItemVo>>((resolve, reject) => {
        const hasCondition =
          condition && Object.values(condition as any).length !== 0;
        if (!hasCondition && !state.update && state.records.length !== 0) {
          resolve(getters[Getters.records]);
          return;
        }
        tenantPage({ current: state.current, size: state.size }, condition)
          .then((response) => {
            const data = response.data;
            const records = data.records;
            commit(Mutations.setRecords, records);
            resolve(getters[Getters.records]);
          })
          .catch(() => {
            reject();
          });
      });
    },
    [`${Actions.create}`]({ commit }, params: SysTenant) {
      return new Promise<void>((resolve, reject) => {
        create(params)
          .then(() => {
            commit(Mutations.openUpdateFlag);
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },
    [`${Actions.remove}`]({ commit }, id: string) {
      return new Promise<void>((resolve, reject) => {
        remove(id)
          .then(() => {
            commit(Mutations.openUpdateFlag);
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },
    [`${Actions.update}`]({ commit }, params: SysTenant) {
      return new Promise<void>((resolve, reject) => {
        update(params)
          .then(() => {
            commit(Mutations.openUpdateFlag);
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },
  },
};

export default module;

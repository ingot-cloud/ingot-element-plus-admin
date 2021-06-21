import { Module } from "vuex";
import { RootState, TenantModuleState } from "@/store/types";
import { tenantPage, create, update, remove } from "@/api/authority/tenant";
import { Page, RolePageItemVo, SysTenant } from "@/model";
import { Mutations, Actions, Getters } from "@/store/constants/tenant";

export { moduleName } from "@/store/constants/tenant";

const module: Module<TenantModuleState, RootState> = {
  namespaced: true,
  state: {
    records: [],
    current: 1,
    size: 1000, // 租户不进行分页，默认获取1000条
    update: true,
  },
  mutations: {
    [`${Mutations.setRecords}`](state, records) {
      state.update = false;
      state.records = records;
    },
    [`${Mutations.openUpdateFlag}`](state) {
      state.update = true;
    },
  },
  getters: {
    [`${Getters.records}`]: (state) => state.records,
  },
  actions: {
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

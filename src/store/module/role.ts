import { Module } from "vuex";
import { RootState, RoleModuleState } from "@/store/types";
import { rolePage, create, update, remove } from "@/api/authority/role";
import { Page, RolePageItemVo, SysRole } from "@/model";
import { Mutations, Actions, Getters } from "@/store/constants/role";

export { moduleName } from "@/store/constants/role";

const module: Module<RoleModuleState, RootState> = {
  namespaced: true,
  state: {
    records: [],
    current: 1,
    size: 1000, // 角色没必要分页，默认获取1000条
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
    [`${Getters.roleData}`]: (state) => state.records,
  },
  actions: {
    [`${Actions.fetchData}`]({ state, commit, getters }, condition: SysRole) {
      return new Promise<Page<RolePageItemVo>>((resolve, reject) => {
        if (!state.update && state.records.length !== 0) {
          resolve(getters[Getters.roleData]);
          return;
        }
        rolePage({ current: state.current, size: state.size }, condition)
          .then((response) => {
            const data = response.data;
            const records = data.records;
            commit(Mutations.setRecords, records);
            resolve(getters[Getters.roleData]);
          })
          .catch(() => {
            reject();
          });
      });
    },
    [`${Actions.create}`]({ commit }, params: SysRole) {
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
    [`${Actions.update}`]({ commit }, params: SysRole) {
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

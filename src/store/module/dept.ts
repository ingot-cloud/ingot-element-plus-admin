import { Module } from "vuex";
import { RootState, DeptModuleState, DeptTree } from "@/store/types";
import {
  getDeptTree,
  createDept,
  removeDept,
  updateDept
} from "@/api/authority/dept";
import { SysDept } from "@/model";
import { Mutations, Actions, Getters } from "@/store/constants/dept";

const module: Module<DeptModuleState, RootState> = {
  namespaced: true,
  state: {
    props: {
      children: "children",
      label: "name"
    },
    nodeKey: "id",
    expandedKeys: [],
    data: [],
    update: true
  },
  mutations: {
    [`${Mutations.setDeptTree}`](state, { data, expandedKeys }) {
      state.update = false;
      state.data = data;
      state.expandedKeys = expandedKeys;
    },
    [`${Mutations.openUpdateFlag}`](state) {
      state.update = true;
    }
  },
  getters: {
    [`${Getters.deptData}`]: (state): DeptTree => {
      return {
        props: state.props,
        nodeKey: state.nodeKey,
        expandedKeys: state.expandedKeys,
        data: state.data
      };
    }
  },
  actions: {
    [`${Actions.fetchTree}`]({ state, commit, getters }) {
      return new Promise<DeptTree>((resolve, reject) => {
        if (!state.update && state.data.length !== 0) {
          resolve(getters.deptData);
          return;
        }
        getDeptTree()
          .then(response => {
            const data = response.data;
            const expandedKeys: Array<string> = [];
            data.forEach(root => {
              if (root.id) {
                expandedKeys.push(root.id);
              }
            });

            commit(Mutations.setDeptTree, { data, expandedKeys });
            resolve(getters.deptData);
          })
          .catch(() => {
            reject();
          });
      });
    },
    [`${Actions.createDept}`]({ commit }, params: SysDept) {
      return new Promise<void>((resolve, reject) => {
        createDept(params)
          .then(() => {
            commit(Mutations.openUpdateFlag);
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },
    [`${Actions.removeDept}`]({ commit }, id: string) {
      return new Promise<void>((resolve, reject) => {
        removeDept(id)
          .then(() => {
            commit(Mutations.openUpdateFlag);
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },
    [`${Actions.updateDept}`]({ commit }, params: SysDept) {
      return new Promise<void>((resolve, reject) => {
        updateDept(params)
          .then(() => {
            commit(Mutations.openUpdateFlag);
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    }
  }
};

export default module;

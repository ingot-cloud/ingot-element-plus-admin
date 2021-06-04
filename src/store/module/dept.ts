import { Module } from "vuex";
import { RootState, DeptModuleState, DeptTree } from "@/store/types";
import {
  getDeptTree
  //   createDept,
  //   removeDept,
  //   updateDept
} from "@/api/authority/dept";

export const moduleName = "dept";

export const module: Module<DeptModuleState, RootState> = {
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
    setDeptTree(state, { data, expandedKeys }) {
      state.update = false;
      state.data = data;
      state.expandedKeys = expandedKeys;
    },
    openUpdateFlag(state) {
      state.update = true;
    }
  },
  getters: {
    deptData: (state): DeptTree => {
      return {
        props: state.props,
        nodeKey: state.nodeKey,
        expandedKeys: state.expandedKeys,
        data: state.data
      };
    }
  },
  actions: {
    fetchTree({ state, commit, getters }) {
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

            commit("setDeptTree", { data, expandedKeys });
            resolve(getters.deptData);
          })
          .catch(() => {
            reject();
          });
      });
    }
  }
};

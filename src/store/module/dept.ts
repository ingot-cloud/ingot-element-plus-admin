import { Module } from "vuex";
import {
  RootState,
  DeptModuleState,
  DeptTree,
  DeptTreeList,
} from "@/store/types";
import {
  getDeptTree,
  createDept,
  removeDept,
  updateDept,
} from "@/api/authority/dept";
import { DeptTreeNode, SysDept } from "@/model";
import { Mutations, Actions, Getters } from "@/store/constants/dept";

export { moduleName } from "@/store/constants/dept";

const stretchTree = (treeNode: DeptTreeNode, arr: Array<SysDept>): void => {
  arr.push({ id: treeNode.id, name: treeNode.name });
  if (treeNode.children && treeNode.children.length > 0) {
    treeNode.children.forEach((child) => {
      stretchTree(child, arr);
    });
  }
};

const module: Module<DeptModuleState, RootState> = {
  namespaced: true,
  state: {
    expandedKeys: [],
    data: [],
    update: true,
  },
  mutations: {
    [`${Mutations.setDeptTree}`](state, { data, expandedKeys }) {
      state.update = false;
      state.data = data;
      state.expandedKeys = expandedKeys;
    },
    [`${Mutations.openUpdateFlag}`](state) {
      state.update = true;
    },
  },
  getters: {
    [`${Getters.deptTreeData}`]: (state): DeptTree => {
      return {
        props: {
          children: "children",
          label: "name",
        },
        nodeKey: "id",
        expandedKeys: state.expandedKeys,
        data: state.data,
      };
    },
    [`${Getters.deptTreeListData}`]: (state): DeptTreeList => {
      return {
        props: {
          children: "children",
          hasChildren: "hasChildren",
        },
        key: "id",
        data: state.data,
      };
    },
    [`${Getters.deptList}`]: (state) => {
      const ret: Array<SysDept> = [];

      state.data.forEach((item) => {
        stretchTree(item, ret);
      });

      return ret;
    },
  },
  actions: {
    [`${Actions.fetchTree}`]({ state, commit }) {
      return new Promise<Array<DeptTreeNode>>((resolve, reject) => {
        if (!state.update && state.data.length !== 0) {
          resolve(state.data);
          return;
        }
        getDeptTree()
          .then((response) => {
            const data = response.data;
            const expandedKeys: Array<string> = [];
            data.forEach((root) => {
              if (root.id) {
                expandedKeys.push(root.id);
              }
            });

            commit(Mutations.setDeptTree, { data, expandedKeys });
            resolve(data);
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
    },
  },
};

export default module;

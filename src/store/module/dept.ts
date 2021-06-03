import { Module } from "vuex";
import { RootState } from "@/store/types";
import { DeptTreeNode } from "@/model";
import {
  getDeptTree
  //   createDept,
  //   removeDept,
  //   updateDept
} from "@/api/authority/dept";

interface DeptTree {
  props: object;
  nodeKey: string;
  expandedKeys: Array<string>;
  data: Array<DeptTreeNode>;
}

export interface DeptModuleState {
  props: object;
  nodeKey: string;
  expandedKeys: Array<string>;
  data: Array<DeptTreeNode>;
  update: boolean;
}

const deptModule: Module<DeptModuleState, RootState> = {
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
    openUpdateDeptTreeFlag(state) {
      state.update = true;
    }
  },
  getters: {
    getDeptData: state => {
      return {
        props: state.props,
        nodeKey: state.nodeKey,
        expandedKeys: state.expandedKeys,
        data: state.data
      };
    }
  },
  actions: {
    fetchDeptTree({ state, commit, getters }) {
      return new Promise<DeptTree>((resolve, reject) => {
        if (!state.update && state.data.length !== 0) {
          resolve(getters.getDeptData());
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
            resolve(getters.getDeptData());
          })
          .catch(() => {
            reject();
          });
      });
    }
  }
};

export default deptModule;

import type { DeptTreeNode, SysDept } from "@/models";
import {
  DeptTreeAPI,
  CreateDeptAPI,
  UpdateDeptAPI,
  RemoveDeptAPI,
} from "@/api/basic/dept";

export const useDeptStore = defineStore("dept", () => {
  const expandedKeys = ref<Array<string>>([]);
  const deptTree = ref<Array<DeptTreeNode>>([]);

  const fetchDeptTree = () => {
    return new Promise<Array<DeptTreeNode>>((resolve, reject) => {
      DeptTreeAPI()
        .then((response) => {
          const data = response.data;
          data.forEach((root) => {
            if (root.id) {
              expandedKeys.value.push(root.id);
            }
          });

          deptTree.value = data.slice();
          resolve(data);
        })
        .catch(() => {
          reject();
        });
    });
  };
  const createDept = (params: SysDept) => {
    return new Promise<void>((resolve, reject) => {
      CreateDeptAPI(params)
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  };
  const updateDept = (params: SysDept) => {
    return new Promise<void>((resolve, reject) => {
      UpdateDeptAPI(params)
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  };
  const removeDept = (id: string) => {
    return new Promise<void>((resolve, reject) => {
      RemoveDeptAPI(id)
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  };

  return {
    expandedKeys,
    deptTree,
    fetchDeptTree,
    createDept,
    updateDept,
    removeDept,
  };
});

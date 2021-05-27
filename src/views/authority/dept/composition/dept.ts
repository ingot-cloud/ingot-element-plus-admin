import { reactive, ref } from "vue";
import { getDeptTree } from "@/api/authority/dept";
import { DeptTreeNode } from "@/model";

interface DeptTree {
  props: object;
  nodeKey: string;
  expandedKeys: Array<string>;
  data: Array<DeptTreeNode>;
}

const rawDeptTree: DeptTree = {
  props: {
    children: "children",
    label: "name"
  },
  nodeKey: "id",
  expandedKeys: [],
  data: []
};

// 部门数据
export const deptTree = reactive(rawDeptTree);
// 是否加载数据
export const loading = ref(false);

/**
 * 获取部门数据，树结构
 */
export function fetchDeptData() {
  return new Promise<Array<DeptTreeNode>>((resolve, reject) => {
    loading.value = true;
    getDeptTree()
      .then(response => {
        loading.value = false;
        deptTree.data = response.data;

        deptTree.expandedKeys = [];
        response.data.forEach(root => {
          if (root.id) {
            deptTree.expandedKeys.push(root.id);
          }
        });
        resolve(response.data);
      })
      .catch(() => {
        loading.value = false;
        reject();
      });
  });
}

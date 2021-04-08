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

const node: DeptTreeNode = {};

// 选定的节点
export const selectedDeptNode = ref(node);
// 部门数据
export const deptTree = reactive(rawDeptTree);
// 是否加载数据
export const loading = ref(false);

/**
 * 处理节点点击事件
 * @param node 部门树节点
 */
export function handleTreeNodeClick(node: DeptTreeNode) {
  selectedDeptNode.value = node;
}

/**
 * 获取部门数据，树结构
 */
export function fetchDeptData() {
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
    })
    .catch(() => {
      loading.value = false;
    });
}

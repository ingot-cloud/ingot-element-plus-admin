import { ref } from "vue";
import { fetchDeptTree } from "@/store/composition/dept";

// 部门数据
export const deptTree = ref({});
// 是否加载数据
export const loading = ref(false);

/**
 * 获取部门数据，树结构
 */
export function fetchDeptData() {
  loading.value = true;
  fetchDeptTree()
    .then(data => {
      deptTree.value = data;
      console.log(data);
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
}

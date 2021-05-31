import { defineComponent, onMounted } from "vue";
import {
  deptTree,
  fetchDeptData
} from "@/views/authority/dept/composition/dept";
import { pageInfo, handleTreeNodeClick } from "./composition/user";

export default defineComponent({
  components: {},
  setup() {
    onMounted(() => {
      fetchDeptData().then(deptData => {
        handleTreeNodeClick(deptData[0]);
      });
    });

    return {
      deptTree,
      pageInfo,
      handleTreeNodeClick
    };
  }
});

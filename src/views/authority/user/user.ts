import { defineComponent, onMounted } from "vue";
import {
  deptTree,
  fetchDeptData
} from "@/views/authority/dept/composition/dept";
import { pageInfo, handleTreeNodeClick } from "./composition/user";

export default defineComponent({
  components: {},
  data() {
    return {
      listHeaders: [
        {
          label: "序号",
          prop: "id",
          type: "index"
        },
        {
          label: "用户名",
          prop: "username"
        }
      ]
    };
  },
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

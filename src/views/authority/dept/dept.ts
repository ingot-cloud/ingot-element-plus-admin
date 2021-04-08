import { useStore } from "@/store";
import { user, roles } from "@/core/store/composition/auth";
import { deptTree, loading, fetchDeptData } from "./composition/dept";
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  components: {},
  setup() {
    const store = useStore();

    onMounted(() => {
      fetchDeptData();
    });

    return {
      deptTree,
      loading,
      user: user(store),
      roles: roles(store)
    };
  }
});

import { useStore } from "@/store";
import { user, roles } from "@/core/store/composition/auth";
import { deptData } from "./composition/dept";
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  setup() {
    const store = useStore();
    return {
      deptData,
      user: user(store),
      roles: roles(store)
    };
  }
});

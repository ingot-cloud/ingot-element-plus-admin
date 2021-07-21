import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  props: ["id"],
  setup() {
    const route = useRoute();

    return {
      title: `角色：${route.query.name}`,
    };
  },
});

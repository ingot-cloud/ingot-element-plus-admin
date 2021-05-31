import { defineComponent, PropType } from "vue";
import { HeaderItem, Page } from "./data";

export default defineComponent({
  props: {
    data: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Object as PropType<Array<HeaderItem>>,
      default: () => []
    },
    page: {
      type: Object as PropType<Page>,
      default: null
    }
  },
  methods: {
    handleSizeChange(val: number) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val: number) {
      this.$emit("handleCurrentChange", val);
    }
  }
});

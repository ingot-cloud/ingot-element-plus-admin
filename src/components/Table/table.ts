import { defineComponent, PropType, ref, watch } from "vue";
import { HeaderItem, Page } from "./data";

export default defineComponent({
  emits: ["handleSizeChange", "handleCurrentChange"],
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    headers: {
      type: Object as PropType<Array<HeaderItem>>,
      default: () => null,
    },
    page: {
      type: Object as PropType<Page>,
      default() {
        return {
          current: 1,
          size: 20,
          total: 0,
        };
      },
    },
    pageSize: {
      type: Array,
      default() {
        return [20, 30, 40, 50];
      },
    },
    pageLayout: {
      type: String,
      default() {
        return "total, sizes, prev, pager, next, jumper";
      },
    },
  },
  setup(props, { emit }) {
    const properties = props as any;
    const page = properties.page;

    watch(
      () => properties.page.size,
      (value) => {
        size.value = value;
      }
    );
    watch(
      () => properties.page.total,
      (value) => {
        total.value = value;
      }
    );

    const current = page.current;
    const size = ref(page.size);
    const total = ref(page.total);

    return {
      current,
      size,
      total,
      handleSizeChange(val: number) {
        emit("handleSizeChange", { value: val, type: "size" });
      },
      handleCurrentChange(val: number) {
        emit("handleCurrentChange", { value: val, type: "current" });
      },
    };
  },
});

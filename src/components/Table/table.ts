import { defineComponent, PropType, ref, watch, unref } from "vue";
import { HeaderItem, Page } from "./type";

export default defineComponent({
  emits: [
    "handleSizeChange",
    "handleCurrentChange",
    "select",
    "selectAll",
    "selectionChange",
  ],
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
    selection: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Boolean,
      default: false,
    },
    indexLabel: {
      type: String,
      default: "序号",
    },
  },
  setup(props, { emit }) {
    const properties = props as any;
    const page = properties.page;

    const headerDrawer = ref(false);
    const headersEnable = ref(
      properties.headers.filter(
        (item: HeaderItem) => !item.hide
      ) as Array<HeaderItem>
    );
    const headersEnableValue = ref(
      headersEnable.value.map((item) => item.prop)
    );
    const headerTransferProps = { label: "label", key: "prop" };
    const headerTransferTitles = ["可选项", "显示项"];

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

    const ingotTable = ref();

    return {
      ingotTable,
      current,
      size,
      total,
      headerDrawer,
      headersEnable,
      headersEnableValue,
      headerTransferProps,
      headerTransferTitles,
      privateHandleSizeChange(val: number) {
        emit("handleSizeChange", { value: val, type: "size" });
      },
      privateHandleCurrentChange(val: number) {
        emit("handleCurrentChange", { value: val, type: "current" });
      },
      privateOnTableSelect(selection: any) {
        emit("select", selection);
      },
      privateOnTableSelectAll(selection: any, row: any) {
        emit("selectAll", selection, row);
      },
      privateOnTableSelectionChange(selection: any) {
        emit("selectionChange", selection);
      },
      privateOnHeaderChanged(value: any) {
        headersEnable.value = properties.headers.filter((item: HeaderItem) =>
          value.includes(item.prop)
        );
      },
      /**
       * 用于多选表格，清空用户的选择
       */
      clearSelection() {
        const table = unref(ingotTable);
        table.clearSelection();
      },
      editHeader() {
        headerDrawer.value = true;
      },
    };
  },
});

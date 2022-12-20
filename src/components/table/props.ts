import type { PropType } from "vue";
import type { TableHeaderItem, TablePage } from "./types";

export const tableProps = {
  data: {
    type: Array,
    default: () => [],
  },
  headers: {
    type: Object as PropType<Array<TableHeaderItem>>,
    default: () => null,
  },
  page: {
    type: Object as PropType<TablePage>,
    default() {
      return {
        current: 1,
        size: 20,
        total: 0,
      };
    },
  },
  stripe: {
    type: Boolean,
    default: false,
  },
  pageSize: {
    type: Object as PropType<Array<number>>,
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
  selectionProps: {
    type: Object as PropType<TableHeaderItem>,
    default() {
      return {
        align: "center",
        width: "50",
      };
    },
  },
  selectable: {
    type: Function as PropType<(row: any, index: number) => boolean>,
  },
  index: {
    type: Boolean,
    default: false,
  },
  indexProps: {
    type: Object as PropType<TableHeaderItem>,
    default() {
      return {
        label: "序号",
        align: "center",
        width: "50",
      };
    },
  },
  rowKey: {
    type: [String, Function] as PropType<string | ((row: any) => string)>,
  },
  defaultExpandAll: {
    type: Boolean,
    default: false,
  },
  expandRowKeys: {
    type: Array,
    default() {
      return undefined;
    },
  },
  treeProps: {
    type: Object,
    default() {
      return { hasChildren: "hasChildren", children: "children" };
    },
  },
  headerCellStyle: {
    type: Object,
    default() {
      return {
        background: "#fafafa",
        color: "black",
      };
    },
  },
};

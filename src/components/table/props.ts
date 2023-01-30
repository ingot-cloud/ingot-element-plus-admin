import type { PropType } from "vue";
import type { TableHeaderRecord, TablePage } from "./types";
import { TreeListKeyAndProps } from "@/models";

export const tableProps = {
  data: {
    type: Array,
    default: () => [],
  },
  headers: {
    type: Object as PropType<Array<TableHeaderRecord>>,
    default() {
      return [];
    },
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
  loading: {
    type: Boolean,
    default: false,
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
    type: Object as PropType<TableHeaderRecord>,
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
    type: Object as PropType<TableHeaderRecord>,
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
    default() {
      return TreeListKeyAndProps.key;
    },
  },
  highlightCurrentRow: {
    type: Boolean,
    default: false,
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
      return TreeListKeyAndProps.props;
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
  radioKey: {
    type: String,
  },
};

import type { PropType } from "vue";
import type { TableHeaderRecord, TablePage } from "./types";
import type { Sort } from "element-plus";
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
  border: {
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
    type: Array as PropType<string[]>,
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
  radioKey: {
    type: String,
  },
  defaultSort: {
    type: Object as PropType<Sort | undefined>,
  },
  hideSetting: {
    type: Boolean,
    default: false,
  },
};

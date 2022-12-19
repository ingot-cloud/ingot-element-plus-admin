import type { TableHeaderItem } from "@/models/components";

export const tableHeaders: Array<TableHeaderItem> = [
  {
    label: "部门名称",
    prop: "name",
  },
  {
    label: "权限范围",
    prop: "scope",
  },
  {
    label: "排序",
    prop: "sort",
  },
  {
    label: "状态",
    prop: "status",
  },
  {
    label: "操作",
    width: "280",
    prop: "actions",
    fixed: "right",
    align: "center",
  },
];

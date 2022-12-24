import type { TableHeaderRecord } from "@/components/table";

export const tableHeaders: Array<TableHeaderRecord> = [
  {
    label: "菜单名称",
    prop: "name",
  },
  {
    label: "路径",
    prop: "path",
  },
  {
    label: "状态",
    prop: "status",
    hide: true,
  },
  {
    label: "备注",
    prop: "remark",
    hide: true,
  },
  {
    label: "操作",
    width: "210",
    prop: "actions",
    fixed: "right",
    align: "center",
  },
];

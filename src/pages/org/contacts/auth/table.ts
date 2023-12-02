import type { TableHeaderRecord } from "@/components/table";
export const tableHeaders: Array<TableHeaderRecord> = [
  {
    label: "权限名称",
    prop: "name",
  },
  {
    label: "操作",
    width: "100",
    prop: "actions",
    fixed: "right",
    align: "center",
  },
];

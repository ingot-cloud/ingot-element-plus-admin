import type { TableHeaderRecord } from "@/components/table";

export const tableHeaders: Array<TableHeaderRecord> = [
  {
    label: "权限",
    prop: "code",
  },
  {
    label: "操作",
    width: "120",
    prop: "actions",
    fixed: "right",
    align: "center",
  },
];

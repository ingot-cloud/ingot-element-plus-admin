import type { TableHeaderRecord } from "@/components/table";
export const tableHeaders: Array<TableHeaderRecord> = [
  {
    label: "权限",
    prop: "code",
  },
  {
    label: "操作",
    prop: "actions",
    fixed: "right",
    align: "center",
    width: "100px",
  },
];

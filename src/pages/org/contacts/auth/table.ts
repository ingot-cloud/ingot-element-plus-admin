import type { TableHeaderRecord } from "@/components/table";
export const tableHeaders: Array<TableHeaderRecord> = [
  {
    label: "权限",
    prop: "code",
  },
  {
    label: "名称",
    prop: "name",
    width: "120px",
  },
  {
    label: "操作",
    prop: "actions",
    fixed: "right",
    align: "center",
    width: "100px",
  },
];

import type { TableHeaderRecord } from "@/components/table";
export const tableHeaders: Array<TableHeaderRecord> = [
  {
    label: "名称",
    prop: "avatar",
    align: "left",
  },
  {
    label: "手机号",
    prop: "phone",
    align: "left",
  },
  {
    label: "email",
    prop: "email",
    align: "left",
    transform: (v) => v || "-",
  },
];

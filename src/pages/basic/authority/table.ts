import type { TableHeaderRecord } from "@/components/table";
export const tableHeaders: Array<TableHeaderRecord> = [
  {
    label: "权限名称",
    prop: "name",
  },
  {
    label: "权限编码",
    prop: "code",
  },
  {
    label: "类型",
    prop: "type",
  },
  {
    label: "状态",
    prop: "status",
  },
  {
    label: "操作",
    width: "320",
    prop: "actions",
    fixed: "right",
    align: "center",
  },
];

import type { TableHeaderRecord } from "@/components/table";

export const tableHeaders: Array<TableHeaderRecord> = [
  {
    label: "客户端ID",
    prop: "clientId",
  },
  {
    label: "状态",
    prop: "status",
  },
  {
    label: "注册时间",
    prop: "clientIdIssuedAt",
  },
  {
    label: "操作",
    width: "210",
    prop: "actions",
    fixed: "right",
    align: "center",
  },
];

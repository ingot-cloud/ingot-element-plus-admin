import type { TableHeaderRecord } from "@/components/table";

export const tableHeaders: Array<TableHeaderRecord> = [
  {
    label: "序号",
    type: "index",
    align: "center",
    width: "50",
  },
  {
    label: "租户名称",
    prop: "name",
  },
  {
    label: "租户编码",
    prop: "code",
  },
  {
    label: "状态",
    prop: "status",
  },
  {
    label: "开始时间",
    prop: "startAt",
    transform: (value: string) => value || "-",
  },
  {
    label: "结束时间",
    prop: "endAt",
    transform: (value: string) => value || "-",
  },
  {
    label: "创建时间",
    prop: "createdAt",
  },
  {
    label: "操作",
    width: "210",
    prop: "actions",
    fixed: "right",
    align: "center",
  },
];

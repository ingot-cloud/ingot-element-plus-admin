import type { HeaderItem } from "@/components/table/types";
export const tableHeaders: Array<HeaderItem> = [
  {
    label: "序号",
    type: "index",
    align: "center",
    width: "50",
  },
  {
    label: "角色名",
    prop: "name",
  },
  {
    label: "角色编码",
    prop: "code",
  },
  {
    label: "角色类型",
    prop: "type",
    transform: (value: string) => value || "-",
  },
  {
    label: "状态",
    prop: "status",
  },
  {
    label: "备注",
    prop: "remark",
    hide: true,
  },
  {
    label: "创建时间",
    prop: "createdAt",
  },
  {
    label: "操作",
    width: "320",
    prop: "actions",
    fixed: "right",
    align: "center",
  },
];

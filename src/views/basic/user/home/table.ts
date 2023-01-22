import type { TableHeaderRecord } from "@/components/table";
export const tableHeaders: Array<TableHeaderRecord> = [
  {
    label: "序号",
    type: "index",
    align: "center",
    width: "50",
  },
  {
    label: "用户名",
    prop: "username",
  },
  {
    label: "昵称",
    prop: "nickname",
    hide: true,
  },
  {
    label: "手机号",
    prop: "phone",
  },
  {
    label: "email",
    prop: "email",
  },
  {
    label: "状态",
    prop: "status",
  },
  {
    label: "注册时间",
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

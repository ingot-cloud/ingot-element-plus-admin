import { HeaderItem } from "@/components/Table/type";

export const tableHeaders: Array<HeaderItem> = [
  {
    label: "用户名",
    prop: "clientId",
  },
  {
    label: "手机号",
    prop: "resourceId",
    hide: true,
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

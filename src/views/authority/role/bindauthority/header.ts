import { HeaderItem } from "@/components/Table/type";

export const tableHeaders: Array<HeaderItem> = [
  {
    label: "权限名称",
    prop: "name",
  },
  {
    label: "权限编码",
    prop: "code",
  },
  {
    label: "路径",
    prop: "path",
  },
  {
    label: "方法",
    prop: "method",
  },
  {
    label: "备注",
    prop: "remark",
    hide: true,
  },
  {
    label: "状态",
    prop: "status",
  },
  {
    label: "操作",
    width: "210",
    prop: "actions",
    fixed: "right",
    align: "center",
  },
];

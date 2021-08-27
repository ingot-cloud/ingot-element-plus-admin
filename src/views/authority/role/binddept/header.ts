import { HeaderItem } from "@/components/Table/type";

export const tableHeaders: Array<HeaderItem> = [
  {
    label: "部门名称",
    prop: "name",
  },
  {
    label: "权限范围",
    prop: "scope",
  },
  {
    label: "排序",
    prop: "sort",
    hide: true,
  },
  {
    label: "状态",
    prop: "status",
    hide: true,
  },
  {
    label: "操作",
    width: "210",
    prop: "actions",
    fixed: "right",
    align: "center",
  },
];

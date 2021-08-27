import { HeaderItem } from "@/components/Table/type";

export const tableHeaders: Array<HeaderItem> = [
  {
    label: "菜单名称",
    prop: "name",
  },
  {
    label: "图标",
    prop: "icon",
  },
  {
    label: "路径",
    prop: "path",
  },
  {
    label: "视图路径",
    prop: "viewPath",
    hide: true,
  },
  {
    label: "排序",
    prop: "sort",
    hide: true,
  },
  {
    label: "是否隐藏",
    prop: "hidden",
    hide: true,
  },
  {
    label: "是否缓存",
    prop: "cache",
    hide: true,
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
    label: "操作",
    width: "210",
    prop: "actions",
    fixed: "right",
    align: "center",
  },
];

import type { HeaderItem } from "@/components/table/types";

export const tableHeaders: Array<HeaderItem> = [
  {
    label: "菜单名称",
    prop: "name",
  },
  {
    label: "菜单编码",
    prop: "code",
  },
  {
    label: "图标",
    prop: "icon",
    width: "50",
    align: "center",
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
    label: "重定向",
    prop: "redirect",
    hide: true,
  },
  {
    label: "排序",
    prop: "sort",
    width: "50",
    align: "center",
  },
  {
    label: "是否隐藏",
    prop: "hidden",
    width: "80",
    transform: (value: boolean) => (value ? "是" : "否"),
  },
  {
    label: "是否缓存",
    prop: "isCache",
    width: "80",
    transform: (value: boolean) => (value ? "是" : "否"),
  },
  {
    label: "状态",
    prop: "status",
    width: "60",
    align: "center",
  },
  {
    label: "备注",
    prop: "remark",
    hide: true,
  },
  {
    label: "操作",
    width: "280",
    prop: "actions",
    fixed: "right",
    align: "center",
  },
];

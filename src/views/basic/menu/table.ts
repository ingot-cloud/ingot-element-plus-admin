import type { TableHeaderItem } from "@/models/components";

export const tableHeaders: Array<TableHeaderItem> = [
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
  },
  {
    label: "是否缓存",
    prop: "isCache",
    width: "80",
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

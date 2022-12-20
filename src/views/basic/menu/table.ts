import type { TableHeaderItem } from "@/components/table";

export const tableHeaders: Array<TableHeaderItem> = [
  {
    label: "菜单名称",
    prop: "name",
  },
  {
    label: "菜单编码",
    prop: "code",
    width: "150",
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
    width: "300",
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
    label: "隐藏菜单",
    prop: "hidden",
    width: "80",
    align: "center",
  },
  {
    label: "隐藏面包屑",
    prop: "hideBreadcrumb",
    width: "80",
    align: "center",
  },
  {
    label: "是否缓存",
    prop: "isCache",
    width: "80",
    align: "center",
  },
  {
    label: "匹配props",
    prop: "props",
    width: "80",
    align: "center",
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

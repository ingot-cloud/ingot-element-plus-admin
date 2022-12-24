import type { TableHeaderRecord } from "@/components/table";

export const tableHeaders: Array<TableHeaderRecord> = [
  {
    label: "菜单名称",
    prop: "name",
  },
  {
    label: "菜单类型",
    prop: "menuType",
    width: "80",
    align: "center",
  },
  {
    label: "图标",
    prop: "icon",
    width: "50",
    align: "center",
  },
  {
    label: "权限编码",
    prop: "authorityCode",
    transform: (v) => v || "-",
  },
  {
    label: "路径",
    prop: "path",
    width: "300",
  },
  {
    label: "路由名称",
    prop: "routeName",
    hide: true,
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
    label: "操作",
    width: "280",
    prop: "actions",
    fixed: "right",
    align: "center",
  },
];

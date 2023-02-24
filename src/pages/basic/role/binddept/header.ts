import type { TableHeaderRecord } from "@/components/table";
import { getDeptRoleScopeDesc } from "@/models/enums";

export const tableHeaders: Array<TableHeaderRecord> = [
  {
    label: "部门名称",
    prop: "name",
  },
  {
    label: "权限范围",
    prop: "scope",
    transform: (v) => getDeptRoleScopeDesc(v),
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

import type { TableHeaderRecord } from "@/components/table";
import { useDeptRoleScopeEnum } from "@/models/enums";

export const tableHeaders: Array<TableHeaderRecord> = [
  {
    label: "部门名称",
    prop: "name",
  },
  {
    label: "权限范围",
    prop: "scope",
    transform: (v) => useDeptRoleScopeEnum.getTagText(v).text,
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

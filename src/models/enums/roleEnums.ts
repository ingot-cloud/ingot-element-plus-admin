import { newEnumExt } from "../common";

export enum RoleType {
  System = "0",
  Custom = "9",
}
export const RoleTypeEnumExtArray = [
  newEnumExt(RoleType.System, "系统默认", "success"),
  newEnumExt(RoleType.Custom, "自定义", "warning"),
];
export const useRoleTypeEnum = useEnum(RoleTypeEnumExtArray);

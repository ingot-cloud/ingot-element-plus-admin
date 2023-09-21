import { newEnumExt } from "../common";

export enum RoleType {
  System = "0",
  Tenant = "1",
  Custom = "9",
}
export const RoleTypeEnumExtArray = [
  newEnumExt(RoleType.System, "系统默认", "danger"),
  newEnumExt(RoleType.Tenant, "组织", "success"),
  newEnumExt(RoleType.Custom, "自定义", "warning"),
];
export const useRoleTypeEnum = () => {
  return useEnum(RoleTypeEnumExtArray);
};

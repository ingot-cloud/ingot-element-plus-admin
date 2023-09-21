import { newEnumExt } from "../common";

export enum AuthorityType {
  System = "0",
  Tenant = "1",
}
export const AuthorityTypeEnumExtArray = [
  newEnumExt(AuthorityType.System, "系统默认", "danger"),
  newEnumExt(AuthorityType.Tenant, "组织", "success"),
];
export const useAuthorityTypeEnum = () => {
  return useEnum(AuthorityTypeEnumExtArray);
};

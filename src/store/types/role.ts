import { UserPageItemVo } from "@/model";

export interface RoleModuleState {
  records: Array<UserPageItemVo>;
  current: number;
  size: number;
  update: boolean;
}

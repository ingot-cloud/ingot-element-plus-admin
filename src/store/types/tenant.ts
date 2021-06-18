import { SysTenant } from "@/model";

export interface TenantModuleState {
  records: Array<SysTenant>;
  current: number;
  size: number;
  update: boolean;
}

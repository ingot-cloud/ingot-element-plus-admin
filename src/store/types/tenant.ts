import { SimpleTenantVo, SysTenant } from "@/model";

export interface TenantModuleState {
  simpleRecords: Array<SimpleTenantVo>;
  records: Array<SysTenant>;
  current: number;
  size: number;
  update: boolean;
}

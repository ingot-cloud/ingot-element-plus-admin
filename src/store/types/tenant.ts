import { SimpleTenantVo, SysTenant } from "@/model";

export interface TenantModuleState {
  globalTenant: string;
  simpleRecords: Array<SimpleTenantVo>;
  records: Array<SysTenant>;
  current: number;
  size: number;
  update: boolean;
}

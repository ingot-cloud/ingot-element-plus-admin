import { CommonStatus } from "./common";

export interface SysTenant {
  id?: string;
  name?: string;
  code?: string;
  status?: CommonStatus;
  startAt?: string;
  endAt?: string;
  createdAt?: string;
}

export interface SimpleTenantVo {
  id: string;
  name: string;
}

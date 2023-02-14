import type { CommonStatus } from "./enums";

export interface SysTenant {
  id?: string;
  name?: string;
  code?: string;
  status?: CommonStatus;
  startAt?: string;
  endAt?: string;
  createdAt?: string;
}

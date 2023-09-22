import type { CommonStatus } from "./enums";

export interface SysTenant {
  id?: string;
  name?: string;
  code?: string;
  avatar?: string;
  status?: CommonStatus;
  startAt?: string;
  endAt?: string;
  createdAt?: string;
}

export interface CreateOrgDTO {
  avatar?: string;
  name?: string;
  nickname?: string;
  phone?: string;
}

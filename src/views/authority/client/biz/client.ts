import { SysAuthority, Page } from "@/model";
import { reactive } from "vue";

export const condition = reactive({} as SysAuthority);
export const pageInfo = reactive({
  current: 1,
  size: 20,
  total: 0,
  records: [],
} as Page<SysAuthority>);

export function fetchData(): void {
  //
}

export function handleCreate(): void {
  //
}

export function handleEdit(): void {
  //
}

export function handleDelete(): void {
  //
}

export function handleDisable(): void {
  //
}

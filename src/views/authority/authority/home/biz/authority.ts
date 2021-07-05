import { SysAuthority, Page, PageChangeParams } from "@/model";
import { reactive, toRaw } from "vue";
import { page } from "@/api/authority/authority";

export const condition = reactive({} as SysAuthority);
export const pageInfo = reactive({
  current: 1,
  size: 20,
  total: 0,
  records: [],
} as Page<SysAuthority>);

export function fetchData(params?: PageChangeParams): void {
  if (params) {
    pageInfo[params.type] = params.value;
  }
  const pageParams = toRaw(pageInfo);
  pageParams.total = undefined;
  pageParams.records = undefined;
  page(pageParams, condition).then((response) => {
    pageInfo.records = response.data.records;
    pageInfo.total = Number(response.data.total);
  });
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

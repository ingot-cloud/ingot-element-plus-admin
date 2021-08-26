import {
  SysAuthority,
  Page,
  PageChangeParams,
  CommonStatus,
  getCommonStatusActionDesc,
} from "@/model";
import { reactive, toRaw } from "vue";
import { page } from "@/api/authority/authority";
import { update, remove } from "@/api/authority/authority";
import { Confirm, Message } from "@/utils/message";

export const condition = reactive({} as SysAuthority);
export const pageInfo = reactive({
  current: 1,
  size: 20,
  total: 0,
  records: [],
} as Page<SysAuthority>);

export const parent = reactive({} as SysAuthority);

export function fetchData(params?: PageChangeParams): void {
  if (params) {
    pageInfo[params.type] = params.value;
  }
  const pageParams = toRaw(pageInfo);
  pageParams.total = undefined;
  pageParams.records = undefined;
  condition.pid = parent.id;
  page(pageParams, condition).then((response) => {
    pageInfo.records = response.data.records;
    pageInfo.total = Number(response.data.total);
  });
}

export function handleDelete(
  params: SysAuthority,
  callback?: (params?: PageChangeParams) => void
): void {
  Confirm.warning(`是否删除权限(${params.name})`).then(() => {
    remove(params.id as string).then(() => {
      Message.success("操作成功");
      if (callback) {
        callback();
      }
    });
  });
}

export function handleDisable(
  params: SysAuthority,
  callback?: (params?: PageChangeParams) => void
): void {
  const status =
    params.status === CommonStatus.Enable
      ? CommonStatus.Lock
      : CommonStatus.Enable;
  const message = `是否${getCommonStatusActionDesc(status)}权限(${
    params.name
  })`;
  Confirm.warning(message).then(() => {
    update({ id: params.id, status }).then(() => {
      Message.success("操作成功");
      if (callback) {
        callback();
      }
    });
  });
}

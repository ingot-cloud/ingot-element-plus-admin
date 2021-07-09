import {
  SysOauthClientDetails,
  Page,
  PageChangeParams,
  CommonStatus,
  getCommonStatusActionDesc,
} from "@/model";
import { reactive, toRaw, unref, ref } from "vue";
import { page, update, remove } from "@/api/authority/client";
import { Confirm, Message } from "@/utils/message";
import router from "@/router";

export const createDialogRef = ref();

export const condition = reactive({} as SysOauthClientDetails);
export const pageInfo = reactive({
  current: 1,
  size: 20,
  total: 0,
  records: [],
} as Page<SysOauthClientDetails>);

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
  const dialog = unref(createDialogRef);
  dialog.show();
}

export function handleManager(params: SysOauthClientDetails): void {
  router.push({
    path: `/authority/client/${params.id}`,
  });
}

export function handleDelete(
  params: SysOauthClientDetails,
  callback?: FunctionConstructor
): void {
  Confirm.warning(`是否删除客户端(${params.clientId})`).then(() => {
    remove(params.clientId as string).then(() => {
      Message.success("操作成功");
      if (callback) {
        callback();
      }
    });
  });
}

export function handleDisable(
  params: SysOauthClientDetails,
  callback?: FunctionConstructor
): void {
  const status =
    params.status === CommonStatus.Enable
      ? CommonStatus.Lock
      : CommonStatus.Enable;
  const message = `是否${getCommonStatusActionDesc(status)}客户端(${
    params.clientId
  })`;
  Confirm.warning(message).then(() => {
    update({ clientId: params.clientId, status }).then(() => {
      Message.success("操作成功");
      if (callback) {
        callback();
      }
    });
  });
}

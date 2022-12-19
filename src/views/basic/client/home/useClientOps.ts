import type { OAuth2RegisteredClient, Page, PageChangeParams } from "@/models";
import { CommonStatus, getCommonStatusActionDesc } from "@/models/enums";
import {
  ClientPageAPI,
  UpdateClientAPI,
  RemoveClientAPI,
} from "@/api/basic/client";
import { Confirm, Message } from "@/utils/message";
import router from "@/router";

export const useClientOps = () => {
  const condition = reactive({} as OAuth2RegisteredClient);
  const pageInfo = reactive({
    current: 1,
    size: 20,
    total: 0,
    records: [],
  } as Page<OAuth2RegisteredClient>);

  const fetchData = (params?: PageChangeParams): void => {
    if (params) {
      pageInfo[params.type] = params.value;
    }
    const pageParams = toRaw(pageInfo);
    pageParams.total = undefined;
    pageParams.records = undefined;
    ClientPageAPI(pageParams, condition).then((response) => {
      pageInfo.records = response.data.records;
      pageInfo.total = Number(response.data.total);
    });
  };

  const handleManager = (params: OAuth2RegisteredClient): void => {
    router.push({
      path: `/basic/client/${params.id}`,
    });
  };

  const handleDelete = (
    params: OAuth2RegisteredClient,
    callback?: (params?: PageChangeParams) => void
  ): void => {
    Confirm.warning(`是否删除客户端(${params.clientId})`).then(() => {
      RemoveClientAPI(params.clientId as string).then(() => {
        Message.success("操作成功");
        if (callback) {
          callback();
        }
      });
    });
  };

  const handleDisable = (
    params: OAuth2RegisteredClient,
    callback?: (params?: PageChangeParams) => void
  ): void => {
    const status =
      params.status === CommonStatus.Enable
        ? CommonStatus.Lock
        : CommonStatus.Enable;
    const message = `是否${getCommonStatusActionDesc(status)}客户端(${
      params.clientId
    })`;
    Confirm.warning(message).then(() => {
      UpdateClientAPI({ clientId: params.clientId, status }).then(() => {
        Message.success("操作成功");
        if (callback) {
          callback();
        }
      });
    });
  };

  return {
    condition,
    pageInfo,
    fetchData,
    handleManager,
    handleDelete,
    handleDisable,
  };
};

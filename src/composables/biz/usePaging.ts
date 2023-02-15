import type { R, Page, PageChangeParams } from "@/models";
import { Confirm, Message } from "@/utils/message";

export type FetchPageAPI<T, C> = (
  page: Page,
  condition?: C
) => Promise<R<Page<T>>>;

export type DeleteRecordAPI = (id: string) => Promise<R<void>>;

export type UpdateRecordAPI<T> = (record: T) => Promise<R<void>>;

export type ActionCallback = (params?: PageChangeParams) => void;

/**
 * 分页
 */
export const usePaging = <Record, Condition>(
  fetchPageAPI: FetchPageAPI<Record, Condition>
) => {
  const loading = ref<boolean>(false);
  const condition = reactive({}) as Condition;
  const pageInfo = reactive<Page<Record>>({
    current: 1,
    size: 20,
    total: 0,
    records: [],
  }) as Page<Record>;

  const fetchData = (params?: PageChangeParams): void => {
    if (params) {
      pageInfo[params.type] = params.value;
    }
    const pageParams = toRaw(pageInfo);
    pageParams.total = undefined;
    pageParams.records = undefined;
    loading.value = true;
    fetchPageAPI(pageParams, condition)
      .then((result) => {
        loading.value = false;
        pageInfo.records = result.data.records;
        pageInfo.total = Number(result.data.total);
      })
      .catch(() => (loading.value = false));
  };

  return {
    loading,
    condition,
    pageInfo,
    fetchData,
  };
};

export const useConfirmDelete = (
  deleteRecordAPI: DeleteRecordAPI,
  callback?: ActionCallback
) => {
  const handleDelete = (id: string, message: string) => {
    Confirm.warning(message).then(() => {
      deleteRecordAPI(id).then(() => {
        Message.success("操作成功");
        if (callback) {
          callback();
        }
      });
    });
  };

  return {
    handleDelete,
  };
};

export const useConfirmUpdate = <Record>(
  updateRecordAPI: UpdateRecordAPI<Record>,
  callback?: ActionCallback
) => {
  const handleUpdate = (params: Record, message: string) => {
    Confirm.warning(message).then(() => {
      updateRecordAPI(params).then(() => {
        Message.success("操作成功");
        if (callback) {
          callback();
        }
      });
    });
  };

  return {
    handleUpdate,
  };
};

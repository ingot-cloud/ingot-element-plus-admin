import type { OptionIDEntity } from "@/models";
import { Message, Confirm } from "@/utils/message";
import type { BindSetupParams, UnbindSetupReturn } from "../types";

/**
 * 未绑定数据视图
 */
export const useUnbind = <T extends OptionIDEntity>(
  params: BindSetupParams<T>
): UnbindSetupReturn<T> => {
  const isShow = ref(false);
  const headers = ref(Object.assign([], params.tableHeaders));
  const editBatch = ref(false);
  const bindTable = ref();
  const selectData = ref<Array<T>>([]);
  const queryCondition = reactive({});
  const records = ref<Array<any>>([]);

  const fetchData = () => {
    params
      .fetchData(params.id, false, toRaw(queryCondition) as T)
      .then((response) => {
        records.value = response.data;
      });
  };

  const handleBind = (item: T) => {
    Confirm.warning(params.singleConfirmMessage(item)).then(() => {
      params.bind({ id: params.id, bindIds: [item.id as string] }).then(() => {
        Message.success("操作成功");
        if (params.emit) {
          params.emit("dataChanged");
        }
        fetchData();
      });
    });
  };

  const handleBatchBind = () => {
    Confirm.warning(params.batchConfirmMessage).then(() => {
      const bindIds = selectData.value.map((item) => item.id as string);
      params.bind({ id: params.id, bindIds }).then(() => {
        Message.success("操作成功");
        if (params.emit) {
          params.emit("dataChanged");
        }
        fetchData();
      });
    });
  };

  const cancelEditBatch = () => {
    editBatch.value = false;
    const table = unref(bindTable);
    table.clearSelection();
  };

  const onSelectChanged = (selection: Array<any>) => {
    selectData.value = selection;
  };

  const show = () => {
    isShow.value = true;
  };

  onMounted(() => {
    fetchData();
  });

  return {
    isShow,
    bindTable,
    editBatch,
    headers,
    records,
    selectData,
    queryCondition,
    fetchData,
    handleBind,
    handleBatchBind,
    cancelEditBatch,
    onSelectChanged,
    show,
  };
};

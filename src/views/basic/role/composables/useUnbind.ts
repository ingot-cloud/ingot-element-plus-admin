import type { Page, PageChangeParams, OptionIDEntity } from "@/models";
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
  const selectData = ref([] as Array<T>);
  const raw: Page<T> = {
    current: 1,
    size: 20,
    total: 0,
    records: [],
  };
  const bindPageInfo = reactive(raw);
  const queryCondition = reactive({});

  const fetchData = (changeParams?: PageChangeParams | boolean) => {
    if (changeParams) {
      if (changeParams instanceof Boolean) {
        bindPageInfo.current = 0;
        bindPageInfo.size = 20;
      } else {
        changeParams = changeParams as PageChangeParams;
        bindPageInfo[changeParams.type] = changeParams.value;
      }
    }

    params
      .fetchData(
        { current: bindPageInfo.current, size: bindPageInfo.size },
        params.id,
        false,
        toRaw(queryCondition) as T
      )
      .then((response) => {
        Object.assign(bindPageInfo, {
          records: response.data.records,
          total: Number(response.data.total),
        });
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
    if (bindPageInfo.records?.length === 0) {
      fetchData();
    }
  });

  return {
    isShow,
    bindTable,
    editBatch,
    headers,
    bindPageInfo,
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

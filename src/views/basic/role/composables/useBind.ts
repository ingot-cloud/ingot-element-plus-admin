import type { Page, PageChangeParams, OptionIDEntity } from "@/models";
import { Message, Confirm } from "@/utils/message";
import type { BindSetupParams, BindSetupReturn } from "../types";

/**
 * 已绑数据视图
 * @param params BindSetupParams
 * @returns
 */
export const useBind = <T extends OptionIDEntity>(
  params: BindSetupParams<T>
): BindSetupReturn<T> => {
  const headers = ref(params.tableHeaders.slice());
  const editBatch = ref(false);
  const bindTable = ref();
  const bindView = ref();
  const selectData = ref([] as Array<T>);
  const raw: Page<T> = {
    current: 1,
    size: 20,
    total: 0,
    records: [],
  };
  const bindPageInfo = reactive(raw);
  const queryCondition = reactive({});

  /**
   * 获取已绑定数据
   */
  const fetchData = (changeParams?: PageChangeParams | boolean) => {
    if (changeParams) {
      if (changeParams instanceof Boolean) {
        bindPageInfo.current = 1;
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
        true,
        toRaw(queryCondition) as T
      )
      .then((response) => {
        Object.assign(bindPageInfo, {
          records: response.data.records,
          total: Number(response.data.total),
        });
      });
  };

  /**
   * 解绑操作
   */
  const handleUnbind = (item: T) => {
    Confirm.warning(params.singleConfirmMessage(item)).then(() => {
      params
        .bind({ id: params.id, removeIds: [item.id as string] })
        .then(() => {
          Message.success("操作成功");
          fetchData();
          // 更新未绑定数据
          bindView.value?.fetchData();
        });
    });
  };

  /**
   * 批量解绑
   */
  const handleBatchUnbind = () => {
    Confirm.warning(params.batchConfirmMessage).then(() => {
      const removeIds = selectData.value.map((item) => item.id as string);
      params.bind({ id: params.id, removeIds }).then(() => {
        Message.success("操作成功");
        fetchData();
        // 更新未绑定数据
        bindView.value?.fetchData();
      });
    });
  };

  /**
   * 取消批量操作
   */
  const cancelEditBatch = () => {
    editBatch.value = false;
    const table = unref(bindTable);
    table.clearSelection();
  };

  /**
   * 批量操作多选回调
   */
  const onSelectChanged = (selection: Array<any>) => {
    selectData.value = selection;
  };

  /**
   * 显示可以绑定的更多数据
   */
  const showBindMoreView = () => {
    editBatch.value = false;
    const view = unref(bindView);
    view.show();
  };

  onMounted(() => {
    fetchData(true);
  });

  return {
    bindTable,
    bindView,
    editBatch,
    headers,
    bindPageInfo,
    selectData,
    queryCondition,
    fetchData,
    handleUnbind,
    handleBatchUnbind,
    cancelEditBatch,
    onSelectChanged,
    showBindMoreView,
  };
};

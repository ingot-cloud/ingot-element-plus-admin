import { onMounted, ref, reactive, toRaw, unref } from "vue";
import { HeaderItem } from "@/components/Table/type";
import {
  Page,
  PageChangeParams,
  OptionIDEntity,
  RoleBindParams,
  IngotResponse,
} from "@/model";
import { Message, Confirm } from "@/utils/message";

export interface BindSetupParams<T> {
  title: string;
  id: string;
  tableHeaders: Array<HeaderItem>;
  singleConfirmMessage: (item: T) => string;
  batchConfirmMessage: string;
  fetchData: (
    page: Page,
    id: string,
    isBind: boolean,
    condition?: T
  ) => Promise<IngotResponse<Page<T>>>;
  bind: (bindParams: RoleBindParams) => Promise<IngotResponse<void>>;
  emit?: any;
}

/**
 * 已绑数据视图 setup
 * @param params BindSetupParams
 * @returns
 */
export function bindSetup<T extends OptionIDEntity>(
  params: BindSetupParams<T>
): any {
  const headers = ref(Object.assign([], params.tableHeaders));
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
          const view = unref(bindView);
          view.fetchData();
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
        const view = unref(bindView);
        view.fetchData();
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
   * 编辑表格显示列
   */
  const editTableColumn = () => {
    editBatch.value = false;
    const table = unref(bindTable);
    table.editHeader();
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
    title: params.title,
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
    editTableColumn,
    onSelectChanged,
    showBindMoreView,
  };
}

/**
 * 未绑定数据视图 setup
 */
export function unbindSetup<T extends OptionIDEntity>(
  params: BindSetupParams<T>
): any {
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
    title: params.title,
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
}

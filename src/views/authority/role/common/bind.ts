import { onMounted, ref, reactive, toRaw, unref } from "vue";
import { useRoute } from "vue-router";
import { HeaderItem } from "@/components/Table/type";
import {
  Page,
  PageChangeParams,
  BaseRoleBindEntity,
  RoleBindParams,
  IngotResponse,
} from "@/model";
import { Message, Confirm } from "@/utils/message";

export interface BindSetupParams<T> {
  id: string;
  tableHeaders: Array<HeaderItem>;
  singleUnbindMessage: (item: T) => string;
  batchUnbindMessage: string;
  fetchData: (
    page: Page,
    id: string,
    isBind: boolean,
    condition?: T
  ) => Promise<IngotResponse<Page<T>>>;
  unbind: (bindParams: RoleBindParams) => Promise<IngotResponse<void>>;
}

export function bindSetup<T extends BaseRoleBindEntity>(
  params: BindSetupParams<T>
): any {
  const route = useRoute();
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

  const handleUnbind = (item: T) => {
    Confirm.warning(params.singleUnbindMessage(item)).then(() => {
      params
        .unbind({ id: params.id, removeIds: [item.id as string] })
        .then(() => {
          Message.success("操作成功");
          fetchData();
          // 更新未绑定数据
          const view = unref(bindView);
          view.fetchData();
        });
    });
  };

  const handleBatchUnbind = () => {
    Confirm.warning(params.batchUnbindMessage).then(() => {
      const removeIds = selectData.value.map((item) => item.id as string);
      params.unbind({ id: params.id, removeIds }).then(() => {
        Message.success("操作成功");
        fetchData();
        // 更新未绑定数据
        const view = unref(bindView);
        view.fetchData();
      });
    });
  };

  const cancelEditBatch = () => {
    editBatch.value = false;
    const table = unref(bindTable);
    table.clearSelection();
  };

  const editTableColumn = () => {
    editBatch.value = false;
    const table = unref(bindTable);
    table.editHeader();
  };

  const onSelectChanged = (selection: Array<any>) => {
    selectData.value = selection;
  };

  const showBindMoreView = () => {
    editBatch.value = false;
    const view = unref(bindView);
    view.show();
  };

  onMounted(() => {
    fetchData(true);
  });

  return {
    title: `角色：${route.query.name}`,
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

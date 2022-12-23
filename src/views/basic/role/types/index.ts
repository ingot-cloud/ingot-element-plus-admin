import type { Ref } from "vue";
import type { TableHeaderRecord } from "@/components/table";
import type { Page, PageChangeParams, RoleBindParams, R } from "@/models";

export type Apply<T, R> = (t: T) => R;
export type Consumer<T> = Apply<T, void>;
export type Runnable = () => void;
export interface FilterRecord {
  key: string;
  placeholder: string;
}
export type ConfirmMessageFn<T> = Apply<T, string>;
export type FetchDataFn<T> = (
  page: Page,
  id: string,
  isBind: boolean,
  condition?: T
) => Promise<R<Page<T>>>;
export type BindFn = Apply<RoleBindParams, Promise<R<void>>>;
export type DoFetchData = Apply<PageChangeParams | boolean, void>;

export interface BindSetupParams<T> {
  id: string;
  tableHeaders: Array<TableHeaderRecord>;
  singleConfirmMessage: ConfirmMessageFn<T>;
  batchConfirmMessage: string;
  fetchData: FetchDataFn<T>;
  bind: BindFn;
  emit?: any;
}

export interface BindSetupReturn<T> {
  bindTable: Ref;
  bindView: Ref;
  editBatch: Ref<boolean>;
  headers: Ref;
  bindPageInfo: any;
  selectData: Ref;
  queryCondition: any;
  fetchData: DoFetchData;
  handleUnbind: Consumer<T>;
  handleBatchUnbind: Runnable;
  cancelEditBatch: Runnable;
  onSelectChanged: Consumer<Array<any>>;
  showBindMoreView: Runnable;
}

export interface UnbindSetupReturn<T> {
  isShow: Ref;
  bindTable: Ref;
  editBatch: Ref<boolean>;
  headers: Ref;
  bindPageInfo: any;
  selectData: Ref;
  queryCondition: any;
  fetchData: DoFetchData;
  handleBind: Consumer<T>;
  handleBatchBind: Runnable;
  cancelEditBatch: Runnable;
  onSelectChanged: Consumer<Array<any>>;
  show: Runnable;
}

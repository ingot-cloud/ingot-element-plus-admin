export interface TableAPI {
  clearSelection(): void;
  toggleRowSelection(row: any, selected?: boolean): void;
}

export type TransformItem<In, Out> = (value: In) => Out;

export interface TableHeaderRecord<In = any, Out = any> {
  label?: string;
  prop?: string;
  hide?: boolean;
  type?: string;
  width?: string;
  fixed?: string | boolean;
  align?: string;
  transform?: TransformItem<In, Out>;
}

export interface TablePage {
  current?: number;
  size?: number;
  total?: number;
}

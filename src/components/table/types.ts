export interface API {
  clearSelection(): void;
}

export type TransformItem<In, Out> = (value: In) => Out;

export interface HeaderItem<In = any, Out = any> {
  label?: string;
  prop?: string;
  hide?: boolean;
  type?: string;
  width?: string;
  fixed?: string | boolean;
  align?: string;
  transform?: TransformItem<In, Out>;
}

export interface Page {
  current: number;
  size: number;
  total: number;
}

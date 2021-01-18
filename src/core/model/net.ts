export interface IngotResponse<T = any> {
  // 响应结构字段
  code: string;
  message: string;
  data: T;
  // http resposne 公共字段
  headers: any;
}

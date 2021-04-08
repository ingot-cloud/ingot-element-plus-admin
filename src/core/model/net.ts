/**
 * 请求响应模型
 */
export interface IngotResponse<T = any> {
  // 响应码
  code: string;
  // 消息
  message: string;
  // 响应体
  data: T;
  // http resposne 公共字段
  headers: any;
}

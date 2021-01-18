export interface IngotResponse<T = any> {
  code: string;
  message: string;
  data: T;
}

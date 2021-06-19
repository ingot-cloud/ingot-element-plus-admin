import { ElMessage } from "element-plus";

export interface Options {
  customClass?: string;
  center?: boolean;
  dangerouslyUseHTMLString?: boolean;
  duration?: number;
  iconClass?: string;
  id?: string;
  offset?: number;
  onClose?: () => void;
  showClose?: boolean;
  zIndex?: number;
}

export default class Message {
  static warning(message: string, options?: Options): void {
    ElMessage({
      message,
      type: "warning",
      ...options,
    });
  }

  static error(message: string, options?: Options): void {
    ElMessage({
      message,
      type: "error",
      ...options,
    });
  }

  static success(message: string, options?: Options): void {
    ElMessage({
      message,
      type: "success",
      ...options,
    });
  }
}

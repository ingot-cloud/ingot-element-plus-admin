import { CommonStatus } from "./enums";

export type ElTagType = "" | "success" | "warning" | "info" | "danger";

export interface SelectItemParams {
  label: string;
  value: string;
}

export interface ButtonStatusParams {
  title: string;
  type: string;
  icon: string;
}

export function getDisableButtonParams(
  status: CommonStatus
): ButtonStatusParams {
  switch (status) {
    case CommonStatus.Enable:
      return {
        title: "锁定",
        type: "danger",
        icon: "ep:lock",
      };
    case CommonStatus.Lock:
      return {
        title: "解锁",
        type: "success",
        icon: "ep:unlock",
      };
  }
}

/**
 * 分页模型
 */
export interface Page<T extends any = any> {
  current?: number;
  size?: number;
  total?: number;
  records?: Array<T>;
}

export interface PageChangeParams {
  type: "current" | "size";
  value: number;
}

/**
 * 可选ID实体
 */
export interface OptionIDEntity {
  id?: string;
}

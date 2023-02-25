import { CommonStatus } from "./enums";

export type ElTagType = "" | "success" | "warning" | "info" | "danger";

export interface EnumExt<T = string> extends TagText {
  value: T;
}

export const newEnumExt = <T>(
  value: T,
  text: string,
  tag: ElTagType = ""
): EnumExt<T> => {
  return {
    value,
    text: text,
    tag,
  };
};

export interface TagText {
  tag: ElTagType;
  text: string;
}

export const newTagText = (text: string, tag: ElTagType = "") => {
  return {
    text,
    tag,
  };
};

export interface Option<T = string> {
  value: T;
  label: string;
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

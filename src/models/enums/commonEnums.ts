import type { ElTagType } from "../common";

/**
 * 公共状态
 */
export enum CommonStatus {
  // 可用
  Enable = "0",
  // 锁定
  Lock = "9",
}

export function getCommonStatusDesc(status: CommonStatus): string {
  switch (status) {
    case CommonStatus.Enable:
      return "正常";
    case CommonStatus.Lock:
      return "锁定";
  }
}

export function getCommonStatusActionDesc(status: CommonStatus): string {
  switch (status) {
    case CommonStatus.Enable:
      return "启用";
    case CommonStatus.Lock:
      return "锁定";
  }
}

export function getCommonStatusTag(status: CommonStatus): ElTagType {
  switch (status) {
    case CommonStatus.Enable:
      return "success";
    case CommonStatus.Lock:
      return "danger";
  }
}

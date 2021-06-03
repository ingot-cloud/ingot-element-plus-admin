/**
 * 公共状态
 */
export enum CommonStatus {
  // 可用
  Enable = "0",
  // 锁定
  Lock = "9"
}

export function getCommonStatusDesc(status: CommonStatus) {
  switch (status) {
    case CommonStatus.Enable:
      return "正常";
    case CommonStatus.Lock:
      return "锁定";
  }
}

export function getCommonStatusTag(status: CommonStatus) {
  switch (status) {
    case CommonStatus.Enable:
      return "success";
    case CommonStatus.Lock:
      return "danger";
  }
}

/**
 * 分页模型
 */
export interface Page<T extends object = object> {
  current?: number;
  size?: number;
  total?: number;
  records?: Array<T>;
}

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

export function getCommonStatusTag(status: CommonStatus): string {
  switch (status) {
    case CommonStatus.Enable:
      return "success";
    case CommonStatus.Lock:
      return "danger";
  }
}

export interface ButtonStatusParams {
  title: string;
  type: string;
}

export function getDisableButtonParams(
  status: CommonStatus
): ButtonStatusParams {
  switch (status) {
    case CommonStatus.Enable:
      return {
        title: "锁定",
        type: "danger",
      };
    case CommonStatus.Lock:
      return {
        title: "解锁",
        type: "success",
      };
  }
  return {} as ButtonStatusParams;
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

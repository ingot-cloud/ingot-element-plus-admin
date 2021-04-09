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

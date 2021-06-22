/* eslint-disable @typescript-eslint/ban-types */
/**
 * 对比 raw 和 edit 对象，获取改后的对象
 * @param raw 原始对象
 * @param edit 编辑后的对象
 * @returns T
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function getChangedFieldObj<T extends object>(raw: T, edit: T): T {
  const result = {};

  const keys = Object.entries(raw);
  keys.forEach(([k, v]) => {
    const editVal = Reflect.get(edit, k);
    if (editVal && editVal !== v) {
      Reflect.set(result, k, editVal);
    }
  });

  return result as T;
}

/**
 * 过滤参数, 空参数统一设置为null
 * @param params T
 */
export function filterParams<T extends object>(params: T): void {
  const keys = Object.keys(params);
  keys.forEach((key) => {
    if (!Reflect.get(params, key)) {
      Reflect.set(params, key, null);
    }
  });
}

/**
 * 是否含有条件参数
 */
export function hasConditionParams(condition?: object): boolean {
  if (!condition) {
    return false;
  }

  const values = Object.values(condition);
  if (values.length === 0) {
    return false;
  }

  let ret = false;
  values.forEach((v) => {
    ret = Boolean(v);
  });

  return ret;
}

/**
 * 拷贝参数
 */
export function copyParams<T extends object>(
  from: T,
  to: T,
  filterNull?: boolean
): void {
  const keys = Object.keys(from);
  let tmpValue;
  keys.forEach((key) => {
    tmpValue = Reflect.get(from, key);
    if (!filterNull || typeof tmpValue === "boolean" || tmpValue) {
      Reflect.set(to, key, tmpValue);
    }
  });
}

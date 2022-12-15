/**
 * 对比 raw 和 edit 对象，获取改后的对象
 * @param raw 原始对象
 * @param edit 编辑后的对象
 * @returns T
 */
export function getDiff<T extends object>(raw: T, edit: T): T {
  return getDiffWithIgnore(raw, edit);
}

/**
 * 对比 raw 和 edit 对象，获得更改后的对象
 * @param raw 原始对象
 * @param edit 编辑后的对象
 * @param ignore 忽略的key
 * @returns T
 */
export function getDiffWithIgnore<T extends object>(
  raw: T,
  edit: T,
  ignore?: Array<string>
): T {
  const result = {};

  const keys = Object.entries(raw);
  keys.forEach(([k, v]) => {
    const editVal = Reflect.get(edit, k);
    if ((ignore && ignore.includes(k)) || (editVal && editVal !== v)) {
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
export function copyParams(
  to: object,
  from: object,
  filterNull?: boolean
): void {
  const keys = Object.keys(from);
  copyParamsWithKeys(to, from, keys, filterNull);
}

/**
 * 拷贝参数
 */
export function copyParamsWithKeys(
  to: object,
  from: object,
  keys: Array<string>,
  filterNull?: boolean
): void {
  let tmpValue;
  keys.forEach((key) => {
    tmpValue = Reflect.get(from, key);
    if (!filterNull || typeof tmpValue === "boolean" || tmpValue) {
      Reflect.set(to, key, tmpValue);
    }
  });
}

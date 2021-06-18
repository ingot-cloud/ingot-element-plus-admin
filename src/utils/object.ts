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

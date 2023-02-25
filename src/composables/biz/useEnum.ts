import type { EnumExt, TagText, Option } from "@/models";

export const toEnumExtArray = (
  enumType: object,
  tagTextArray: Array<TagText>
) => {
  return Object.values(enumType).map((item, index) => {
    return {
      value: item,
      text: tagTextArray[index].text,
      tag: tagTextArray[index].tag,
    };
  });
};

/**
 * useEnum
 */
export const useEnum = <T>(arr: Array<EnumExt<T>>) => {
  const getTagText = (
    value: T,
    defaultValue: TagText = { text: "无", tag: "" }
  ): TagText => {
    return arr.find((item) => item.value == value) || defaultValue;
  };

  const getOptions = (): Array<Option<T>> => {
    const result: Array<Option<T>> = [];
    arr.forEach((item) => {
      result.push({
        label: item.text,
        value: item.value,
      });
    });
    return result;
  };
  return { getTagText, getOptions };
};

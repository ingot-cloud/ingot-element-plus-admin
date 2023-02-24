import type { PropType } from "vue";
import type { Option } from "@/models";

export const selectProps = {
  modelValue: {
    type: [Array, String, Number, Boolean, Object],
  },
  split: {
    type: String,
    default: "",
  },
  size: String as PropType<"" | "default" | "small" | "large" | undefined>,
  placeholder: String,
  clearable: Boolean,
  multiple: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array as PropType<Array<Option>>,
    default() {
      return [];
    },
  },
};

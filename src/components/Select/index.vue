<template>
  <el-select
    v-model="selectModel"
    :placeholder="placeholder"
    :size="size"
    :multiple="multiple"
    :clearable="clearable"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch, PropType } from "vue";
import type { SelectItemParams } from "@/model";

const props = defineProps({
  modelValue: {
    type: [Array, String, Number, Boolean, Object],
  },
  split: {
    type: String,
    default: "",
  },
  size: String,
  placeholder: String,
  clearable: Boolean,
  multiple: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array as PropType<Array<SelectItemParams>>,
    default() {
      return [];
    },
  },
});

const emits = defineEmits(["update:modelValue"]);

const split = props.split;
const selectModel =
  split && props.modelValue
    ? ref((props.modelValue as string).split(split))
    : ref(props.modelValue);

let selectChange = false;
let customChange = false;

// 监控 modelValue，如果外层主动改变数值，需要手动改变内部selectModel值
watch(
  () => props.modelValue,
  (nValue) => {
    if (selectChange) {
      selectChange = false;
      return;
    }
    customChange = true;
    selectModel.value =
      split && nValue ? (nValue as string).split(split) : nValue;
  }
);

// 监控 selectModel，如果内部选择发生改变，则改变modelValue值
watch(selectModel, (nValue) => {
  if (customChange) {
    customChange = false;
    return;
  }
  selectChange = true;
  emits("update:modelValue", split ? (nValue as []).join(split) : nValue);
});
</script>

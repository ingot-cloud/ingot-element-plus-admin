<template>
  <el-select
    v-model="selectModel"
    :placeholder="placeholder"
    :size="size"
    :multiple="multiple"
    :clearable="clearable"
    @change="privateOnChanged"
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
import { defineProps, defineEmits, ref, watch } from "vue";
import { selectProps } from "./props";

const props = defineProps(selectProps);
const emits = defineEmits(["update:modelValue", "onChanged"]);

const selectModel =
  props.split && props.modelValue
    ? ref((props.modelValue as string).split(props.split))
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
      props.split && nValue ? (nValue as string).split(props.split) : nValue;
  }
);

// 监控 selectModel，如果内部选择发生改变，则改变modelValue值
watch(selectModel, (nValue) => {
  if (customChange) {
    customChange = false;
    return;
  }
  selectChange = true;
  emits(
    "update:modelValue",
    props.split ? (nValue as []).join(props.split) : nValue
  );
});

const privateOnChanged = (value: any) => {
  emits("onChanged", value);
};
</script>

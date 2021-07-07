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
<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  emits: ["update:modelValue"],
  props: {
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
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props, { emit }) {
    const obj = props as any;
    const split = obj.split;
    const selectModel =
      split && obj.modelValue
        ? ref(obj.modelValue.split(split))
        : ref(obj.modelValue);

    let selectChange = false;
    let customChange = false;

    // 监控 modelValue，如果外层主动改变数值，需要手动改变内部selectModel值
    watch(
      () => obj.modelValue,
      (nValue) => {
        if (selectChange) {
          selectChange = false;
          return;
        }
        customChange = true;
        selectModel.value = split && nValue ? nValue.split(split) : nValue;
      }
    );

    // 监控 selectModel，如果内部选择发生改变，则改变modelValue值
    watch(selectModel, (nValue) => {
      if (customChange) {
        customChange = false;
        return;
      }
      selectChange = true;
      emit("update:modelValue", split ? nValue.join(split) : nValue);
    });

    return {
      selectModel,
    };
  },
});
</script>

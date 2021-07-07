<template>
  <el-select
    v-model="selectModel"
    :placeholder="placeholder"
    :size="size"
    :multiple="multiple"
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

    watch(selectModel, (nValue) => {
      emit("update:modelValue", split ? nValue.join(split) : nValue);
    });

    return {
      selectModel,
    };
  },
});
</script>

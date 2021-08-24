<template>
  <el-popover
    ref="innerRef"
    trigger="click"
    :placement="placement"
    :width="width"
    :disabled="disabled"
    @show="onVisibleChanged('up')"
    @hide="onVisibleChanged('down')"
  >
    <template #reference>
      <el-input :disabled="disabled" v-model="label" :placeholder="placeholder">
        <template #suffix>
          <i
            v-if="!disabled && label"
            @click="onClearClick"
            class="el-input__icon el-icon-circle-close el-input__clear"
          ></i>
          <i :class="['el-input__icon', `el-icon-arrow-${status}`]"></i>
        </template>
      </el-input>
    </template>
    <el-tree
      :data="data"
      :props="treeProps"
      :highlight-current="true"
      :expand-on-click-node="false"
      @node-click="onItemClick"
    ></el-tree>
  </el-popover>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch } from "vue";

const props = defineProps({
  modelValue: String,
  disabled: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Array,
  },
  placement: {
    type: String,
    default: "bottom",
  },
  placeholder: {
    type: String,
    default: "请选择",
  },
  width: {
    type: String,
    default: "500px",
  },
  size: {
    type: String,
    default: "small",
  },
  props: {
    type: Object,
    default() {
      return {
        children: "children",
        label: "label",
        value: "value",
      };
    },
  },
});

const emits = defineEmits(["update:modelValue"]);

const innerRef = ref();
const status = ref("down");
const label = ref("");

const treeProps = props.props;
const valueKey = props.props.value;
const labelKey = props.props.label;
const childKey = props.props.children;
const getLabel = (arr: Array<any>, value: any): string => {
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i][valueKey] == value) {
      return arr[i][labelKey];
    }
    if (arr[i][childKey] && arr[i][childKey].length !== 0) {
      const label = getLabel(arr[i][childKey], value);
      if (label) {
        return label;
      }
    }
  }
  return "";
};

watch(
  () => props.modelValue,
  (value) => {
    label.value = getLabel(props.data as [], value);
  },
  {
    immediate: true,
  }
);

const onItemClick = (item: any) => {
  emits("update:modelValue", item[props.props.value]);
  label.value = item[props.props.label];
  innerRef.value.hide();
};
const onClearClick = () => {
  emits("update:modelValue", "");
  label.value = "";
  innerRef.value.hide();
};
const onVisibleChanged = (value: string) => {
  status.value = value;
};
</script>
<style lang="stylus" scoped>
.icon-select-show-container
  line-height 30px
  height 30px
  display flex
  flex-direction row
  align-items center
  justify-content center
  border-radius 4px
  border 1px solid #DCDFE6
  .reset-item
    position absolute
    right 10px
.select-icon
  width 25px
  height 100%
.icon-container
  display flex
  flex-direction row
  flex-wrap wrap
  align-items center
  padding-right 10px
  padding-bottom 10px
  .icon-item
    margin-top 10px
    margin-left 10px
    width 30px
    padding-top 5px
    text-align center
    font-size 30px
    color #24292e
    cursor pointer
</style>

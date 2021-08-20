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
      :props="props"
      :highlight-current="true"
      :expand-on-click-node="false"
      @node-click="onItemClick"
    ></el-tree>
  </el-popover>
</template>
<script lang="ts">
import { defineComponent, ref, unref, watch, watchEffect } from "vue";

export default defineComponent({
  props: {
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
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const properties = props as any;
    const innerRef = ref();
    const status = ref("down");
    const label = ref("");

    const valueKey = properties.props.value;
    const labelKey = properties.props.label;
    const childKey = properties.props.children;
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
      () => properties.modelValue,
      (value) => {
        label.value = getLabel(properties.data, value);
      },
      {
        immediate: true,
      }
    );

    return {
      innerRef,
      label,
      status,
      onItemClick(item: any) {
        emit("update:modelValue", item[properties.props.value]);
        label.value = item[properties.props.label];
        const pop = unref(innerRef);
        pop.hide();
      },
      onClearClick() {
        emit("update:modelValue", "");
        label.value = "";
        const pop = unref(innerRef);
        pop.hide();
      },
      onVisibleChanged(value: string) {
        status.value = value;
      },
    };
  },
});
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

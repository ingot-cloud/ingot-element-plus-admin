<template>
  <el-popover
    ref="innerRef"
    trigger="click"
    :placement="placement"
    :width="width"
  >
    <template #reference>
      <div :class="[`el-form-item--${size}`, 'icon-select-show-container']">
        <ingot-icon v-if="modelValue" class="select-icon" :icon="modelValue" />
        <div v-if="modelValue" class="reset-item">
          <i
            class="el-input__icon el-icon-circle-close el-input__clear"
            @click.stop="onClearClick"
          ></i>
        </div>
        <el-button v-else :size="size" type="text">选择icon</el-button>
      </div>
    </template>
    <div class="icon-container">
      <div
        class="icon-item"
        v-for="item of icons"
        :key="item"
        @click="onItemClick(item)"
      >
        <ingot-icon :icon="item" />
      </div>
    </div>
  </el-popover>
</template>
<script lang="ts">
import { defineComponent, ref, unref } from "vue";
import { icons } from "@/icons";

export default defineComponent({
  props: {
    modelValue: String,
    placement: {
      type: String,
      default: "bottom",
    },
    width: {
      type: String,
      default: "500px",
    },
    size: {
      type: String,
      default: "small",
    },
  },
  emits: ["update:modelValue"],
  setup(_, { emit }) {
    const innerRef = ref();
    return {
      innerRef,
      icons,
      onItemClick(item: string) {
        emit("update:modelValue", item);
        const pop = unref(innerRef);
        pop.hide();
      },
      onClearClick() {
        emit("update:modelValue", "");
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

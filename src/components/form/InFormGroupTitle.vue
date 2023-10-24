<template>
  <div class="in-form-group-title">
    <div class="title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <slot>
      <div v-if="!editFlag" class="edit" @click="editFlag = true">编辑</div>
      <div v-else class="cancel" @click="editFlag = false">取消</div>
    </slot>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  title: {
    type: String,
  },
});
const emits = defineEmits(["update:modelValue"]);
const editFlag = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});
</script>
<style scoped lang="postcss">
.in-form-group-title {
  font-size: 12px;
  line-height: 22px;
  padding: 4px 20px;
  background: #f2f2f6;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & .title {
    color: black;
    font-weight: 500;
  }

  & .edit {
    cursor: pointer;
    color: var(--in-color-primary);
  }
  & .cancel {
    cursor: pointer;
    color: var(--in-color-danger);
  }
}
</style>

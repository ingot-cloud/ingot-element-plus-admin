<template>
  <div>
    <in-biz-tabs-header v-model="headerValue" :tabs="tabs" />
    <div class="inner-container">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TabItem } from "./types.ts";
import { tabsRootContextKey } from "./constants";
import { useOrderedChildren } from "element-plus";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: String,
  },
});

const currentName = ref<string>(props.modelValue!);
const tabs = ref<Array<TabItem>>([]);
const headerValue = computed<string>({
  set(v) {
    emits("update:modelValue", v);
    currentName.value = v;
  },
  get() {
    return currentName.value;
  },
});
watch(
  () => props.modelValue,
  (value) => {
    if (!value) {
      return;
    }
    currentName.value = value;
  }
);

const {
  children: panes,
  addChild: registerPane,
  removeChild: unregisterPane,
} = useOrderedChildren<any>(getCurrentInstance()!, "InBizTabPanel");

provide(tabsRootContextKey, {
  currentName,
  registerPane,
  unregisterPane,
});

watch(panes, (value) => {
  tabs.value = value.map((item) => {
    return {
      id: item.paneName,
      title: item.paneTitle,
    };
  });
});
</script>
<style lang="postcss" scoped>
.inner-container {
  border-top: 1px solid var(--in-border-color);
}
</style>

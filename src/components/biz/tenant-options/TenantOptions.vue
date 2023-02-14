<template>
  <el-select v-model="selectValue" filterable @change="privateOnTenantChanged">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>
<script lang="ts" setup>
import { useTenantStore } from "@/stores/modules/tenant";
import type { Option } from "@/models";
import type { TenantOptionsAPI } from "./types";

const tenantStore = useTenantStore();
const { tenantOptions, getGlobalTenant } = storeToRefs(tenantStore);

const selectValue = ref<string>("");
const options = ref<Array<Option>>([]);

const emits = defineEmits(["onChanged", "update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: String,
  },
  changeGlobal: {
    type: Boolean,
    default: true,
  },
});

let selectChange = false;
let customChange = false;
// 监控 modelValue，如果外层主动改变数值，需要手动改变内部selectModel值
watch(
  () => props.modelValue,
  (value) => {
    if (!value) {
      return;
    }
    if (selectChange) {
      selectChange = false;
      return;
    }
    customChange = true;
    selectValue.value = value;
  }
);

// 监控 selectModel，如果内部选择发生改变，则改变modelValue值
watch(selectValue, (value) => {
  if (!value) {
    return;
  }
  if (customChange) {
    customChange = false;
    return;
  }
  selectChange = true;
  emits("update:modelValue", value);
});

watch(
  tenantOptions,
  (value) => {
    if (props.changeGlobal) {
      options.value = value;
    }
  },
  { immediate: true }
);

const privateOnTenantChanged = (value: string) => {
  if (props.changeGlobal) {
    tenantStore.changeGlobalTenant(value);
  }
  emits("onChanged", value);
};

const publicRefreshOptions = () => {
  tenantStore.fetchOptions().then((data) => {
    options.value = data;
    if (!selectValue.value) {
      selectValue.value = getGlobalTenant.value;
    }
    const index = data.findIndex((item) => item.value === selectValue.value);
    if (index === -1) {
      selectValue.value = data[0].value;
    }
    privateOnTenantChanged(selectValue.value);
  });
};

onMounted(() => {
  publicRefreshOptions();
});

defineExpose<TenantOptionsAPI>({
  getCurrentValue() {
    return selectValue.value;
  },
  refreshOptions: publicRefreshOptions,
});
</script>
<style lang="stylus" scoped></style>

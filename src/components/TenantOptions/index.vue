<template>
  <el-select v-model="tenant" @change="onTenantChanged" :size="size">
    <el-option
      v-for="item in records"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    >
    </el-option>
  </el-select>
</template>
<script lang="ts" setup>
import { defineProps, onMounted } from "vue";
import {
  computedGlobalTenant,
  fetchSimpleList,
  computedSimpleRecords,
  changeGlobalTenant,
} from "@/store/composition/tenant";
import { useStore } from "@/store";

defineProps({
  size: {
    type: String,
    default: "",
  },
});

const store = useStore();
const tenant = computedGlobalTenant();
const records = computedSimpleRecords();

onMounted(() => {
  fetchSimpleList(store).then((data) => {
    const defaultId = tenant.value || data[0].id;
    changeGlobalTenant(defaultId);
  });
});

const onTenantChanged = (value: string) => {
  changeGlobalTenant(value);
};
</script>
<style lang="stylus" scoped></style>

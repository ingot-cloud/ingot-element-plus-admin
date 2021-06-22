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
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import {
  computedGlobalTenant,
  fetchSimpleList,
  computedSimpleRecords,
  changeGlobalTenant,
} from "@/store/composition/tenant";
import { useStore } from "@/store";

export default defineComponent({
  props: {
    size: {
      type: String,
      default: "",
    },
  },
  setup() {
    const store = useStore();
    const tenant = computedGlobalTenant();
    const records = computedSimpleRecords();
    onMounted(() => {
      fetchSimpleList(store).then((data) => {
        const defaultId = tenant.value || data[0].id;
        changeGlobalTenant(defaultId);
      });
    });

    return {
      tenant,
      records,
      onTenantChanged: (value: string) => {
        changeGlobalTenant(value);
      },
    };
  },
});
</script>
<style lang="stylus" scoped></style>

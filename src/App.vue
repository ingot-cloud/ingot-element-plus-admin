<template>
  <el-config-provider :button="buttonConfig" :size="componentSize">
    <router-view />
  </el-config-provider>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { useAppStateStore } from "@/stores/modules/app";
import { storeToRefs } from "pinia";

const { componentSize } = storeToRefs(useAppStateStore());
const buttonConfig = reactive({
  autoInsertSpace: false,
});
</script>

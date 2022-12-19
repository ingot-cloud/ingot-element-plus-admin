<template>
  <el-config-provider
    :button="buttonConfig"
    :size="componentSize"
    :locale="zhCn"
  >
    <router-view />
  </el-config-provider>
</template>
<script lang="ts" setup>
import { useAppStateStore } from "@/stores/modules/app";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

const { componentSize } = storeToRefs(useAppStateStore());
const buttonConfig = reactive({
  autoInsertSpace: false,
});
</script>

<template>
  <el-config-provider :button="buttonConfig" :size="componentSize">
    <router-view />
  </el-config-provider>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { useAppStore } from "@/stores/modules/app";
import { storeToRefs } from "pinia";

const { componentSize } = storeToRefs(useAppStore());
const buttonConfig = reactive({
  autoInsertSpace: false,
});
</script>

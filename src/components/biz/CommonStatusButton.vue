<template>
  <el-button :size="size" :type="getDisableButtonParams(status)?.type">
    {{ getDisableButtonParams(status)?.title }}
  </el-button>
</template>
<script lang="ts" setup>
import { getDisableButtonParams } from "@/model";
import { defineProps } from "vue";
defineProps(["size", "status"]);
</script>

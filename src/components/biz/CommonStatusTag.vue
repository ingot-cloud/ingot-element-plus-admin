<template>
  <el-tag :type="getCommonStatusTag(status)">
    {{ getCommonStatusDesc(status) }}
  </el-tag>
</template>
<script lang="ts" setup>
import { getCommonStatusDesc, getCommonStatusTag } from "@/model";
import { defineProps } from "vue";

defineProps(["status"]);
</script>

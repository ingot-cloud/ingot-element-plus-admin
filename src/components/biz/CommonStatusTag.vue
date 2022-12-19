<template>
  <el-tag :type="getCommonStatusTag(status)">
    {{ getCommonStatusDesc(status) }}
  </el-tag>
</template>
<script lang="ts" setup>
import { getCommonStatusDesc, getCommonStatusTag } from "@/models/enums";
defineProps(["status"]);
</script>

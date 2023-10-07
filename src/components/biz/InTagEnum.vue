<template>
  <el-tag :type="enumObj.getTagText(value).tag">
    {{ enumObj.getTagText(value).text }}
  </el-tag>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import type { EnumObj } from "@/models";
defineProps({
  value: {
    type: String,
    required: true,
  },
  enumObj: {
    type: Object as PropType<EnumObj<string>>,
    required: true,
  },
});
</script>

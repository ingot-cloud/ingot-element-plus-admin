<template>
  <el-tag :type="getCommonStatusTag(status)">
    {{ getCommonStatusDesc(status) }}
  </el-tag>
</template>
<script lang="ts">
import { getCommonStatusDesc, getCommonStatusTag } from "@/model";

import { defineComponent } from "vue";
export default defineComponent({
  props: ["status"],
  setup() {
    return {
      getCommonStatusDesc,
      getCommonStatusTag,
    };
  },
});
</script>

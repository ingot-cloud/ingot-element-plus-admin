<template>
  <el-button :size="size" :type="getDisableButtonParams(status)?.type">
    {{ getDisableButtonParams(status)?.title }}
  </el-button>
</template>
<script lang="ts">
import { getDisableButtonParams } from "@/model";

import { defineComponent } from "vue";
export default defineComponent({
  props: ["size", "status"],
  setup() {
    return {
      getDisableButtonParams,
    };
  },
});
</script>

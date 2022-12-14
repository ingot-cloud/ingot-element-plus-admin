<template>
  <div></div>
</template>
<script lang="ts" setup>
import { doRedirect } from "@/helper/web/usePage";

doRedirect()
  .then(() => {
    console.debug("刷新成功");
  })
  .catch(() => {
    console.debug("刷新失败");
  });
</script>

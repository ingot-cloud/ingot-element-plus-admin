<template>
  <div></div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
import { doRedirect } from "@/helper/web/usePage";
import { RedirectField } from "@/enums/pageEnums";

const props = defineProps({
  [`${RedirectField.PATH}`]: String,
  [`${RedirectField.TYPE}`]: String,
});

doRedirect(props[RedirectField.PATH], props[RedirectField.TYPE])
  .then(() => {
    console.debug("刷新成功");
  })
  .catch(() => {
    console.debug("刷新失败");
  });
</script>

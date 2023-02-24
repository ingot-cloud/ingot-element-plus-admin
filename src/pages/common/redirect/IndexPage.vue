<template>
  <div></div>
</template>
<script lang="ts" setup>
import { RedirectField } from "@/models/enums/pageEnums";
import { Message } from "@/utils/message";

const props = defineProps({
  [`${RedirectField.PATH}`]: String,
  [`${RedirectField.TYPE}`]: String,
});

useRedirect(props[RedirectField.PATH], props[RedirectField.TYPE])
  .then(() => {
    Message.success("刷新成功");
  })
  .catch(() => {
    console.debug("刷新失败");
  });
</script>

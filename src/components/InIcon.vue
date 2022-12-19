<template>
  <svg aria-hidden="true" v-if="isIngotIcon">
    <use :xlink:href="`#ingot-${icon}`" />
  </svg>
  <Icon v-else :icon="icon" />
</template>
<script lang="ts" setup>
import { Icon } from "@iconify/vue";

const props = defineProps<{
  name: String | undefined;
}>();

const isIngotIcon = computed(
  () => props.name && props.name.startsWith("ingot:")
);
const icon = computed(() => {
  if (props.name && props.name.startsWith("ingot:")) {
    return props.name.split(":")[1];
  }
  return props.name;
});
</script>

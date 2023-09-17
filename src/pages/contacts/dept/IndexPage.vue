<template>
  <in-filter-container>
    <template #header>
      <ContactsTabs select-tab="部门" />
    </template>

    a
  </in-filter-container>
</template>
<script lang="ts" setup>
import ContactsTabs from "@/pages/contacts/components/ContactsTabs.vue";
</script>
<style scoped lang="postcss">
:deep(.in-filter-container-header) {
  padding: 0 !important;
}
</style>

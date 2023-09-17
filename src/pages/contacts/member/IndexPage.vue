<template>
  <in-filter-container>
    <template #header>
      <ContactsTabs select-tab="成员" />
    </template>

    <template #left>
      <div w-260px>
        <LeftContent />
      </div>
    </template>

    a
  </in-filter-container>
</template>
<script lang="ts" setup>
import ContactsTabs from "@/pages/contacts/components/ContactsTabs.vue";
import LeftContent from "./components/LeftContent.vue";
</script>
<style scoped lang="postcss">
:deep(.in-filter-container-header) {
  padding: 0 !important;
}
</style>
